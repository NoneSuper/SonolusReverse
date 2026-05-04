import { AssemblyHelper } from "../core/assembly-helper";

export function getSonolusVersion(): string {
    const Version = AssemblyHelper.AssemblyCSharp.class("Sonolus.App");
    return Version.field<Il2Cpp.String>("Version").value.content!;
}