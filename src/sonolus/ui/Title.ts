import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Logger } from "../../utils/Logger";

export class SonolusUITitle {
    private static _inTitleSetup: boolean = false;

    static init(): void {
        const module = this;

        const Title = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Title");

        Title.method<Il2Cpp.Object>("Setup", 0).implementation = function (): Il2Cpp.Object {
            Logger.hook("Title::Setup called"); // <---- OnEnter
            module._inTitleSetup = true;
            const widget = this.method<Il2Cpp.Object>("Setup", 0).invoke(); // ---> OnLeave
            module._inTitleSetup = false;
            return widget;
        };
    }

    static get inTitleSetup(): boolean {
        return this._inTitleSetup;
    }
}
