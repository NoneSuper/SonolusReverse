import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { Ref } from "../reactivity/Ref";
import { Theme } from "./Theme";

/** `Sonolus.Theme.ThemeSystem` - static class */
export class ThemeSystem {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.Theme.ThemeSystem"));
    }

    static get currentTheme(): Ref<Theme> {
        const ref = this.class.method<Il2Cpp.Object>("get_CurrentTheme", 0).invoke();
        return Object.setPrototypeOf(ref, Ref.prototype).bindProto(Theme.prototype) as Ref<Theme>;
    }
}
