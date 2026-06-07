import { AssemblyHelper } from "../../../engine/AssemblyHelper";

export class SonolusSrl extends Il2Cpp.Object {
    private static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        if (!this._class) this._class = AssemblyHelper.AssemblyCSharp.class("Sonolus.Core.Srl");
        return this._class;
    }

    /** Use `create` instead */
    protected constructor(handle: NativePointer) {
        super(handle);
    }

    static create(hash: string, url: string): SonolusSrl {
        const obj = this.class.alloc();
        obj.method<void>(".ctor", 2).invoke(Il2Cpp.string(hash), Il2Cpp.string(url));
        return Object.setPrototypeOf(obj, SonolusSrl.prototype) as SonolusSrl;
    }

    get hash(): string {
        return this.method<Il2Cpp.String>("get_Hash", 0).invoke().content ?? "";
    }

    get url(): string {
        return this.method<Il2Cpp.String>("get_Url", 0).invoke().content ?? "";
    }
}
