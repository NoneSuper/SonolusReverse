import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { Texture2D } from "../../../engine/wrappers/Texture";
import { Dep } from "../reactivity/Dep";

/** `Sonolus.Routing.RouteSection` - wraps a section widget + icon */
export class RouteSection extends Il2Cpp.Object {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return this._class ?? AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.RouteSection");
    }

    /** Alloc + `.ctor(Dep<Texture2D> icon, SectionBase section)` */
    static new(icon: Dep<Texture2D>, section: Il2Cpp.Object): RouteSection {
        const route = this.class.alloc();
        route.method<void>(".ctor", 2).invoke(icon, section);
        Object.setPrototypeOf(route, RouteSection.prototype);
        return route;
    }
}
