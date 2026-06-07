import { AssemblyHelper } from "../../engine/AssemblyHelper";

/** Wrapper over `Sonolus.App` class */
export class SonolusApp {
    private static _class: Il2Cpp.Class | null = null;

    private static _version: string | undefined;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.App"));
    }

    /** Wrapper over `Sonolus.App.Version` field */
    static get version(): string {
        return (this._version ??= this.class.field<Il2Cpp.String>("Version").value.content ?? "unknown");
    }
}
