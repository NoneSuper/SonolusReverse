/** Short-hand to some System Types */
// Requires lazy init
export class System {
    private static _string: Il2Cpp.Class;
    private static _boolean: Il2Cpp.Class;
    private static _action: Il2Cpp.Class;
    private static _func1: Il2Cpp.Class;

    static get String(): Il2Cpp.Class {
        return (this._string ??= Il2Cpp.corlib.class("System.String"));
    }
    static get Boolean(): Il2Cpp.Class {
        return (this._boolean ??= Il2Cpp.corlib.class("System.Boolean"));
    }
    static get Action(): Il2Cpp.Class {
        return (this._action ??= Il2Cpp.corlib.class("System.Action"));
    }
    static get Func1(): Il2Cpp.Class {
        return (this._func1 ??= Il2Cpp.corlib.class("System.Func`1"));
    }
}
