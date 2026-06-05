import { AssemblyHelper } from "../../../engine/AssemblyHelper";

interface Api {
    Srl: Il2Cpp.Class;
}

export class SonolusSrl extends Il2Cpp.Object {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const Asm = AssemblyHelper.AssemblyCSharp;
        const Srl = Asm.class("Sonolus.Core.Srl");

        this._api = {
            Srl
        };

        return this._api;
    }

    /** Use `create` instead */
    protected constructor(handle: NativePointer) {
        super(handle);
    }

    static create(hash: string, url: string): SonolusSrl {
        const api = this.api();
        const obj = api.Srl.alloc();
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
