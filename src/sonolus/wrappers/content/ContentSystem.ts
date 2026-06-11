import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { ContentTheme } from "../core/content/ContentTheme";
import { Dep } from "../reactivity/Dep";

/** `Sonolus.Content.ContentSystem` - static class for server content info */
export class ContentSystem {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.Content.ContentSystem"));
    }

    /**
     * `ContentSystem.get_Themes()`
     *
     * @returns null if not loaded
     */
    static get themes(): ContentTheme[] | null {
        const dep = this.class.method<Il2Cpp.Object>("get_Themes", 0).invoke();
        if (dep.isNull()) return null;

        const array = Object.setPrototypeOf(dep, Dep.prototype).value as Il2Cpp.Array<Il2Cpp.Object>;

        const result: ContentTheme[] = [];
        for (let i = 0; i < array.length; i++) {
            result.push(Object.setPrototypeOf(array.get(i), ContentTheme.prototype) as ContentTheme);
        }
        return result;
    }
}
