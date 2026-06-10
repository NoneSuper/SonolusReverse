import { AssemblyHelper } from "../AssemblyHelper";

export class Texture extends Il2Cpp.Object {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("UnityEngine.Texture"));
    }
}

export class Texture2D extends Texture {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.CoreModule.class("UnityEngine.Texture2D"));
    }
}
