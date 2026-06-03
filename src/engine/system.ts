/** Short-hand to some System Types */
// Requires lazy init
export class System {
    private static _string: Il2Cpp.Class;
    private static _boolean: Il2Cpp.Class;
    private static _action: Il2Cpp.Class;

    static get String(): Il2Cpp.Class {
        if (!this._string) this._string = Il2Cpp.corlib.class("System.String");
        return this._string;
    }
    static get Boolean(): Il2Cpp.Class {
        if (!this._boolean) this._boolean = Il2Cpp.corlib.class("System.Boolean");
        return this._boolean;
    }
    static get Action(): Il2Cpp.Class {
        if (!this._action) this._action = Il2Cpp.corlib.class("System.Action");
        return this._action;
    }
}
