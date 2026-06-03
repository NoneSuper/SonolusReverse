import { AssemblyHelper } from "../../engine/assembly-helper";

/** Wrapper over `Sonolus.App` class */
export class SonolusApp {
    private static _sonolusVersion: string | undefined = undefined;

    /** Wrapper over `Sonolus.App.Version` field */
    static getSonolusVersion(): string {
        if (this._sonolusVersion) return this._sonolusVersion;
        const App = AssemblyHelper.AssemblyCSharp.class("Sonolus.App");
        this._sonolusVersion = App.field<Il2Cpp.String>("Version").value.content ?? "unknown";
        return this._sonolusVersion;
    }
}
