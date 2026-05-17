import { AssemblyHelper } from "../core/assembly-helper";

export class SonolusUtils {
    /** Wrapper over Sonolus.App.Version field */
    static getSonolusVersion(): string {
        const App = AssemblyHelper.AssemblyCSharp.class("Sonolus.App");
        return App.field<Il2Cpp.String>("Version").value.content ?? "unknown";
    }
}
