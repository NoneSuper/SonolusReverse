import { AssemblyHelper } from "../../../engine/assembly-helper";
import { System } from "../../../engine/system";
import { Texture2D } from "../../../engine/wrappers/texture";

/** Wrapper over `Sonolus.Reactivity.Dep` class extends `Il2Cpp.Object` */
class DepBase extends Il2Cpp.Object {
    /**
     * Wrapper over `Sonolus.Reactivity.Dep.Hook(System.Action effect)`
     *
     * @returns `System.Action`
     */
    hook(effect: () => void): Il2Cpp.Object {
        const action = Il2Cpp.delegate(Il2Cpp.corlib.class("System.Action"), effect);
        return this.method<Il2Cpp.Object>("Hook", 1).invoke(action);
    }

    get isInScope(): boolean {
        return this.method<boolean>("get_IsInScope", 0).invoke();
    }
}

interface DepApi {
    Dep: Il2Cpp.Class;
    DepTexture2D: Il2Cpp.Class;
    DepString: Il2Cpp.Class;
    DepBoolean: Il2Cpp.Class;
    opImplicitFromTexture2D: Il2Cpp.Method<Il2Cpp.Object>;
    opImplicitFromString: Il2Cpp.Method<Il2Cpp.Object>;
    opImplicitFromBoolean: Il2Cpp.Method<Il2Cpp.Object>;
}

/**
 * Wrapper over `Sonolus.Reactivity.Dep<T>` class extends `DepBase`
 *
 * Read-only reactive value
 */
export class Dep<T> extends DepBase {
    protected static _depApi: DepApi | null = null;

    private static depApi(): DepApi {
        if (this._depApi) return this._depApi;

        const Asm = AssemblyHelper.AssemblyCSharp;
        const Core = AssemblyHelper.CoreModule;

        const Texture2D = Core.class("UnityEngine.Texture2D");

        const Dep = Asm.class("Sonolus.Reactivity.Dep`1");
        const DepTexture2D = Dep.inflate(Texture2D);
        const DepString = Dep.inflate(System.String);
        const DepBoolean = Dep.inflate(System.Boolean);

        const opImplicitFromTexture2D = DepTexture2D.method<Il2Cpp.Object>("op_Implicit").overload(Texture2D);
        const opImplicitFromString = DepString.method<Il2Cpp.Object>("op_Implicit").overload(System.String);
        const opImplicitFromBoolean = DepBoolean.method<Il2Cpp.Object>("op_Implicit").overload(System.Boolean);

        this._depApi = {
            Dep,
            DepTexture2D,
            DepString,
            DepBoolean,
            opImplicitFromTexture2D,
            opImplicitFromString,
            opImplicitFromBoolean
        };

        return this._depApi;
    }

    /** Use `opImplicit` instead */
    protected constructor(handle: NativePointer) {
        super(handle);
    }

    static opImplicit(value: Texture2D): Dep<Texture2D>;
    static opImplicit(value: string): Dep<Il2Cpp.String>;
    static opImplicit(value: boolean): Dep<boolean>;
    static opImplicit<T>(value: Il2Cpp.Object, klass: Il2Cpp.Class): Dep<T>;
    static opImplicit(value: unknown, klass?: Il2Cpp.Class): Dep<unknown> {
        const api = Dep.depApi();
        let obj: Il2Cpp.Object;

        if (klass) {
            const DepT = api.Dep.inflate(klass);
            obj = DepT.method<Il2Cpp.Object>("op_Implicit", 1)
                .overload(klass)
                .invoke(value as Il2Cpp.Object);
            return Object.setPrototypeOf(obj, Dep.prototype) as Dep<unknown>;
        }

        switch (typeof value) {
            case "boolean": {
                obj = api.opImplicitFromBoolean.invoke(value);
                break;
            }
            case "string": {
                obj = api.opImplicitFromString.invoke(Il2Cpp.string(value));
                break;
            }
            default:
                if (!(value instanceof Texture2D)) throw new Error(`Dep<T>.opImplicit: unsuppoerted type ${typeof value}. Use overload`);
                // if (!(value instanceof Il2Cpp.Object)) throw new Error(`Dep<T>.opImplicit: unsupported type ${typeof value}`);
                // if (!(value.class.name === "UnityEngine.Texture2D")) throw new Error(`Dep<T>.opImplicit: only Texture2D is supported`);
                obj = api.opImplicitFromTexture2D.invoke(value as Il2Cpp.Object);
                break;
        }

        return Object.setPrototypeOf(obj, Dep.prototype) as Dep<unknown>;
    }

    /** Wrapper over `Sonolus.Reactivity.Dep.get_Value` */
    get value(): T {
        return this.method<Il2Cpp.Object>("get_Value", 0).invoke() as T;
    }
}
