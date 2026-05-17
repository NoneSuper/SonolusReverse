import { AssemblyHelper } from "../core/assembly-helper";
import { BaseModule } from "../core/base-module";
import { Logger } from "../logger/logger";
import { wrapString } from "../utils/helpers";
import { SonolusUtils } from "../utils/version";

/*
TODO write
*/

export class TitleLabel extends BaseModule {
    public readonly tag = "TitleLabel";

    // Classes
    private Lbl!: Il2Cpp.Class;
    private Title!: Il2Cpp.Class;

    // Methods
    private LblTitle!: Il2Cpp.Method;
    private TitleSetup!: Il2Cpp.Method;

    private gameVer: string = "";
    private inTitleSetup: boolean = false;

    public init(): void {
        this.Lbl = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Lbl");
        this.Title = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Title");

        this.LblTitle = this.Lbl.method<Il2Cpp.Object>("Title", 1);
        this.TitleSetup = this.Title.method<Il2Cpp.Object>("Setup", 0);

        this.gameVer = SonolusUtils.getSonolusVersion();
    }

    public override initHooks(): void {
        const module = this;

        if (this.gameVer === "unknown") {
            Logger.warn(`[${this.tag}::initHooks] game version is unavailable (getSonolusVersion returned unknown), skipping hook`);
        }

        this.TitleSetup.implementation = function (): Il2Cpp.Object {
            Logger.hook("Title::Setup called");
            module.inTitleSetup = true; // <--- OnEnter
            const widget = this.method<Il2Cpp.Object>("Setup", 0).invoke();
            module.inTitleSetup = false; // ---> OnLeave
            return widget;
        };

        // @ts-ignore
        this.LblTitle.implementation = function (this: Il2Cpp.Object, title: Il2Cpp.Object): Il2Cpp.Object {
            // title is Sonolus.Reactivity.Dep<System.String>
            const value = title.method<Il2Cpp.String>("get_Value").invoke();

            // checking for null here, or we can get access violation
            // checking are we in Title::Setup
            if (module.inTitleSetup && !value.isNull() && value.content === module.gameVer) {
                const newTitle = wrapString(`Reverse | ${module.gameVer}`);
                return this.method<Il2Cpp.Object>("Title", 1).invoke(newTitle);
            }

            return this.method<Il2Cpp.Object>("Title", 1).invoke(title);
        };
    }
}
