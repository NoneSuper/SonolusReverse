import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Config } from "../data/Config";

// https://wiki.sonolus.com/custom-server-specs/headers/sonolus-version
export class VersionCheck {
    private static readonly versionHeaderName = "Sonolus-Version";

    static init(): void {
        const UnityWebRequest = AssemblyHelper.UnityWebRequestModule.class("UnityEngine.Networking.UnityWebRequest");

        // @ts-ignore
        UnityWebRequest.method<Il2Cpp.String>("GetResponseHeader", 1).implementation = function (name: Il2Cpp.String): Il2Cpp.String | NativePointer {
            if (Config.versionCheck && !name.isNull() && name.content === VersionCheck.versionHeaderName) {
                return ptr(0); // or Il2Cpp.string(""); but it's useless allocate new System.String object for that
            }
            return this.method<Il2Cpp.String>("GetResponseHeader", 1).invoke(name);
        };
    }
}
