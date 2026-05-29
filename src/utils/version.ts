import { AssemblyHelper } from "../core/assembly-helper";

let _sonolusVersion: string | undefined = undefined;

export class SonolusUtils {
    /** Wrapper over `Sonolus.App.Version` field */
    static getSonolusVersion(): string {
        if (_sonolusVersion) return _sonolusVersion;
        const App = AssemblyHelper.AssemblyCSharp.class("Sonolus.App");
        _sonolusVersion = App.field<Il2Cpp.String>("Version").value.content ?? "unknown";
        return _sonolusVersion;
    }
}
