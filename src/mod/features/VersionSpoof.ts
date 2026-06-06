import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Config } from "../data/Config";

// TODO rename
export class VersionCheck {
    static init(): void {
        const UnityWebRequest = AssemblyHelper.UnityWebRequestModule.class("UnityEngine.Networking.UnityWebRequest");

        // @ts-ignore
        UnityWebRequest.method<Il2Cpp.String>("GetResponseHeader", 1).implementation = function (name: Il2Cpp.String): Il2Cpp.String | NativePointer {
            if (Config.versionChecks && !name.isNull() && name.content === "Sonolus-Version") {
                return ptr(0); // or Il2Cpp.string(""); but it's useless allocate new System.String object for that
            }
            return this.method<Il2Cpp.String>("GetResponseHeader", 1).invoke(name);
        };
    }
}
