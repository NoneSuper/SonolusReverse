import { AssemblyHelper } from "../core/assembly-helper";
import { Logger } from "../logger/logger";

export class Path {
    private static _dataPath: string | null = null;

    static getDataPath(): string {
        if (this._dataPath !== null) return this._dataPath;

        // Il2Cpp.application.identifier returns "app_process64" on android which is not true
        const raw = AssemblyHelper.CoreModule.class("UnityEngine.Application").method<Il2Cpp.String>("get_persistentDataPath").invoke();
        if (raw.isNull()) {
            Logger.error("[Path::getDataPath] persistentDataPath returned null");
            return "";
        }

        const rawString = raw.content;
        if (!rawString) {
            Logger.error("[Path::getDataPath] persistentDataPath content is null");
            return "";
        }

        this._dataPath = rawString.endsWith("/") ? rawString : rawString + "/";
        Logger.debug(`[Path::getDataPath] ${this._dataPath}`);
        return this._dataPath;
    }
}
