import { Logger } from "../../utils/Logger";
import { AssemblyHelper } from "../AssemblyHelper";

/** `UnityEngine.Application` - static class that provides access to application runtime data */
export class Application {
    protected static _class: Il2Cpp.Class | null = null;

    /** `UnityEngine.Application` */
    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.CoreModule.class("UnityEngine.Application"));
    }

    /** Opens a URL in system browser */
    static openURL(url: string): void {
        Logger.debug(`[Application::openURL] ${url}`);
        this.class.method<void>("OpenURL", 1).invoke(Il2Cpp.string(url));
    }
}
