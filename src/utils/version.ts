import { AssemblyHelper } from "../core/assembly-helper";

export function getSonolusVersion(): string {
    const App = AssemblyHelper.AssemblyCSharp.class("Sonolus.App");
    return App.field<Il2Cpp.String>("Version").value.content ?? "unknown";
}
