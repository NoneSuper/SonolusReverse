export class SonolusWidget extends Il2Cpp.Object {
    private _setFields = new Set<string>();
    private _requiredFields: string[] = [];

    protected setMark(field: string): void {
        this._setFields.add(field);
    }

    protected setRequired(fields: string[]): void {
        this._requiredFields = fields;
    }

    validate(): this {
        const missing = this._requiredFields.filter(field => !this._setFields.has(field));
        if (missing.length > 0) {
            throw new Error(`${this.constructor.name} missing required: ${missing.join(", ")}`);
        }
        return this;
    }

    protected static _new<T extends SonolusWidget>(klass: Il2Cpp.Class): T {
        const obj = klass.new(); // call alloc + il2cpp_object_initialize export
        Object.setPrototypeOf(obj, this.prototype);
        (obj as unknown as Record<string, unknown>)._setFields = new Set<string>();
        (obj as unknown as Record<string, unknown>)._requiredFields = [];
        return obj as T;
    }
}
