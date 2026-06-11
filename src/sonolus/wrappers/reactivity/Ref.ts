import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { System } from "../../../engine/System";
import { Dep } from "./Dep";

/** `Sonolus.Reactivity.Ref<T>` - read-write reactive value, created via `create` */
export class Ref<T> extends Dep<T> {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.Reactivity.Ref`1"));
    }

    /** Use `create` instead */
    protected constructor(handle: NativePointer) {
        super(handle);
    }

    /** Alloc + `.ctor(initial)` + `.ref(true)` - only handles boolean/string */
    static create(initialValue: boolean): Ref<boolean>;
    static create(initialValue: string): Ref<Il2Cpp.String>;
    static create(initialValue: unknown): Ref<unknown>;
    static create(initialValue: unknown): Ref<unknown> {
        let obj: Il2Cpp.Object | null = null;

        switch (typeof initialValue) {
            case "boolean": {
                obj = this.class.inflate(System.Boolean).alloc();
                obj.method<void>(".ctor", 1).invoke(initialValue);
                break;
            }
            case "string": {
                obj = this.class.inflate(System.String).alloc();
                obj.method<void>(".ctor", 1).invoke(Il2Cpp.string(initialValue));
                break;
            }
        }

        obj?.ref(true);
        return Object.setPrototypeOf(obj, Ref.prototype) as Ref<unknown>;
    }

    override set value(value: T) {
        this.method<void>("set_Value", 1).invoke(value as never);
    }

    override get value(): T {
        return super.value;
    }
}
