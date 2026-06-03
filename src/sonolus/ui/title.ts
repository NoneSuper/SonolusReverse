import { AssemblyHelper } from "../../engine/assembly-helper";
import { Logger } from "../../utils/logger";

export class SonolusUITitle {
    /*
    private static _api: Api | null = null;
    
    private static api(): Api {
        if (this._api) return this._api;

        const Asm = AssemblyHelper.AssemblyCSharp;

        // const Lbl = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Lbl");
        const Title = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Title");

        const Titl
        this._api = {
            // Lbl,
            TitleSetup
        }

        return this._api;
    }
    */

    private static _inTitleSetup: boolean = false;

    static init(): void {
        const module = this;

        const Title = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Title");
        Title.method<Il2Cpp.Object>("Setup", 0).implementation = function (): Il2Cpp.Object {
            Logger.hook("Title::Setup called");
            module._inTitleSetup = true;
            const widget = this.method<Il2Cpp.Object>("Setup", 0).invoke();
            module._inTitleSetup = false;
            return widget;
        };
    }

    static get inTitleSetup(): boolean {
        return this._inTitleSetup;
    }
}
