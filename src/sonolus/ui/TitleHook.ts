import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Logger } from "../../utils/Logger";

// Just check here if we are in Title::Setup function
// if yes, we have implementation in TitleLabel
export class TitleHook {
    private static _inTitleSetup: boolean = false;

    static init(): void {
        const Title = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Title");

        Title.method<Il2Cpp.Object>("Setup", 0).implementation = function (): Il2Cpp.Object {
            Logger.hook("Title::Setup called"); // <---- OnEnter
            TitleHook._inTitleSetup = true;
            const widget = this.method<Il2Cpp.Object>("Setup", 0).invoke(); // ---> OnLeave
            TitleHook._inTitleSetup = false;
            return widget;
        };

        Logger.info(`[Title::init] Initialized`);
    }

    static get inTitleSetup(): boolean {
        return this._inTitleSetup;
    }
}
