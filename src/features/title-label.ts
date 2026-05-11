import { AssemblyHelper } from "../core/assembly-helper";
import { BaseModule } from "../core/base-module";
import { Logger } from "../logger/logger";
import { wrapString } from "../utils/helpers";
import { getSonolusVersion } from "../utils/version";

/*
TODO write
*/

export class TitleLabel extends BaseModule {
    public readonly tag = "TitleLabel";

    // Classes
    private Lbl!: Il2Cpp.Class;

    // Methods
    private Title!: Il2Cpp.Method;

    private gameVer: string = "";

    public init(): void {
        this.Lbl = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Lbl");

        this.Title = this.Lbl.method("Title", 1);

        this.gameVer = getSonolusVersion();
    }

    public override initHooks(): void {
        const module = this;

        if (this.gameVer === "unknown") {
            Logger.warn(`[${this.tag}::initHooks] game version is unavailable (getSonolusVersion returned unknown), skipping hook`);
        }

        // @ts-ignore
        this.Title.implementation = function (this: Il2Cpp.Object, title: Il2Cpp.Object): Il2Cpp.Object {
            // title is Sonolus.Reactivity.Dep<System.String>
            const value = title.method<Il2Cpp.String>("get_Value").invoke();

            // checking for null here, or we can get access violation
            if (!value.isNull() && value.content === module.gameVer) {
                const newTitle = wrapString(`Reverse | ${module.gameVer}`);
                return this.method<Il2Cpp.Object>("Title", 1).invoke(newTitle);
            }

            return this.method<Il2Cpp.Object>("Title", 1).invoke(title);
        };
    }
}
