import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { System } from "../../../engine/System";
import { Texture2D } from "../../../engine/wrappers/Texture";

/** Wrapper over `Sonolus.Reactivity.Dep` class extends `Il2Cpp.Object` */
class DepBase extends Il2Cpp.Object {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.Reactivity.Dep"));
    }

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

/**
 * Wrapper over `Sonolus.Reactivity.Dep<T>` class extends `DepBase`
 *
 * Read-only reactive value
 */
export class Dep<T> extends DepBase {
    protected static override _class: Il2Cpp.Class | null = null;

    private _valueProto: object | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.Reactivity.Dep`1"));
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
        let obj: Il2Cpp.Object;

        if (klass) {
            const DepT = this.class.inflate(klass);
            obj = DepT.method<Il2Cpp.Object>("op_Implicit", 1)
                .overload(klass)
                .invoke(value as Il2Cpp.Object);
            return Object.setPrototypeOf(obj, Dep.prototype) as Dep<unknown>;
        }

        switch (typeof value) {
            case "boolean": {
                obj = this.class.inflate(System.Boolean).method<Il2Cpp.Object>("op_Implicit", 1).overload(System.Boolean).invoke(value);
                break;
            }
            case "string": {
                obj = this.class.inflate(System.String).method<Il2Cpp.Object>("op_Implicit", 1).overload(System.String).invoke(Il2Cpp.string(value));
                break;
            }
            default:
                if (!(value instanceof Texture2D)) throw new Error(`Dep<T>.opImplicit: unsupported type ${typeof value}. Use overload`);
                // if (!(value instanceof Il2Cpp.Object)) throw new Error(`Dep<T>.opImplicit: unsupported type ${typeof value}`);
                // if (!(value.class.name === "UnityEngine.Texture2D")) throw new Error(`Dep<T>.opImplicit: only Texture2D is supported`);
                obj = this.class.inflate(Texture2D.class).method<Il2Cpp.Object>("op_Implicit", 1).overload(Texture2D.class).invoke(value);
                break;
        }

        return Object.setPrototypeOf(obj, Dep.prototype) as Dep<unknown>;
    }

    bindProto(prototype: object): this {
        this._valueProto = prototype;
        return this;
    }

    /** Wrapper over `Sonolus.Reactivity.Dep.get_Value` */
    get value(): T {
        //return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_Value", 0).invoke(), T.prototype);
        const value = this.method<Il2Cpp.Field.Type>("get_Value", 0).invoke();
        return this._valueProto ? (Object.setPrototypeOf(value, this._valueProto) as T) : (value as T);
    }
}
