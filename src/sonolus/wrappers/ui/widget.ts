export class SonolusWidget extends Il2Cpp.Object {
    protected static _new<T extends SonolusWidget>(klass: Il2Cpp.Class): T {
        const obj = klass.new(); // call alloc + il2cpp_object_initialize export
        Object.setPrototypeOf(obj, this.prototype);
        return obj as T;
    }
}
