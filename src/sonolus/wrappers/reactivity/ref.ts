import { AssemblyHelper } from "../../../engine/assembly-helper";
import { System } from "../../../engine/system";
import { Dep } from "./dep";

interface RefApi {
    RefString: Il2Cpp.Class;
    RefBoolean: Il2Cpp.Class;
}

/**
 * Wrapper over `Sonolus.Reactivity.Ref<T>` class extends `Dep<T>`
 *
 * Read-Write reactive value
 */
export class Ref<T> extends Dep<T> {
    protected static _refApi: RefApi | null = null;

    protected static refApi(): RefApi {
        if (this._refApi) return this._refApi;

        const Asm = AssemblyHelper.AssemblyCSharp;

        const Ref = Asm.class("Sonolus.Reactivity.Ref`1");

        const RefString = Ref.inflate(System.String);
        const RefBoolean = Ref.inflate(System.Boolean);

        this._refApi = {
            RefString,
            RefBoolean
        };

        return this._refApi;
    }

    /** use `create` instead */
    protected constructor(handle: NativePointer) {
        super(handle);
    }

    static create(initialValue: boolean): Ref<boolean>;
    static create(initialValue: string): Ref<Il2Cpp.String>;
    static create(initialValue: unknown): Ref<unknown> {
        const api = Ref.refApi();

        let obj: Il2Cpp.Object | null = null;

        switch (typeof initialValue) {
            case "boolean": {
                obj = api.RefBoolean.alloc();
                obj.method<void>(".ctor", 1).invoke(initialValue);
                break;
            }
            case "string": {
                obj = api.RefString.alloc();
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
