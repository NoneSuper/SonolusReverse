import { AssemblyHelper } from "../../engine/AssemblyHelper";

/** `Sonolus.App` - static class for version */
export class App {
    private static _class: Il2Cpp.Class | null = null;

    private static _version: string | undefined;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.App"));
    }

    static get version(): string {
        return (this._version ??= this.class.field<Il2Cpp.String>("Version").value.content ?? "unknown");
    }
}
