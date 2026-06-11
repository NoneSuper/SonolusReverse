import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Logger } from "../../utils/Logger";
import { Config } from "../data/Config";

// https://wiki.sonolus.com/custom-server-specs/headers/sonolus-version
export class VersionCheck {
    private static readonly VERSION_HEADER_NAME = "Sonolus-Version";

    static init(): void {
        const UnityWebRequest = AssemblyHelper.UnityWebRequestModule.class("UnityEngine.Networking.UnityWebRequest");

        // @ts-ignore
        UnityWebRequest.method<Il2Cpp.String>("GetResponseHeader", 1).implementation = function (name: Il2Cpp.String): Il2Cpp.String | NativePointer {
            if (Config.versionCheck && !name.isNull() && name.content === VersionCheck.VERSION_HEADER_NAME) {
                return ptr(0); // or Il2Cpp.string(""); but it's useless allocate new System.String object for that
            }
            return this.method<Il2Cpp.String>("GetResponseHeader", 1).invoke(name);
        };

        Logger.info("[VersionCheck::init] Initialized");
    }
}
