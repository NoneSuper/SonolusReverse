import { AssemblyHelper } from "../../engine/assembly-helper";

export class VersionSpoof {
    static init(): void {
        const SemVer = AssemblyHelper.AssemblyCSharp.class("Sonolus.SemVer");

        SemVer.method<boolean>("op_GreaterThan", 2).implementation = () => false;
        SemVer.method<boolean>("op_LessThan", 2).implementation = () => false;
    }
}
