import { AssemblyHelper } from "../core/assembly-helper";

// hooks for set_Value refs, so we can call onChange callback in our refs

export class ConfigRef {
    // public maps, but this is not a good practice!
    // I just want to modify it from helpers.ts, that's why public
    // Map<handle, callback>
    static watchedBool = new Map<string, (value: boolean) => void>();
    static watchedString = new Map<string, (value: string) => void>();

    static init(): void {
        const Asm = AssemblyHelper.AssemblyCSharp;

        const SystemBoolean = Il2Cpp.corlib.class("System.Boolean");
        const SystemString = Il2Cpp.corlib.class("System.String");

        const RefBool = Asm.class("Sonolus.Reactivity.Ref`1").inflate(SystemBoolean);
        const RefString = Asm.class("Sonolus.Reactivity.Ref`1").inflate(SystemString);

        // @ts-ignore
        RefBool.method<void>("set_Value", 1).implementation = function (value: boolean): void {
            ConfigRef.watchedBool.get(this.handle.toString())?.(value);
            this.method<void>("set_Value", 1).invoke(value);
        };

        // @ts-ignore
        RefString.method<void>("set_Value", 1).implementation = function (value: Il2Cpp.String): void {
            ConfigRef.watchedString.get(this.handle.toString())?.(value.isNull() ? "" : (value.content ?? ""));
            this.method<void>("set_Value", 1).invoke(value);
        };
    }
}
