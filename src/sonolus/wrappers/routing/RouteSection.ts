import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { Texture2D } from "../../../engine/wrappers/Texture";
import { Dep } from "../reactivity/Dep";

export class RouteSection extends Il2Cpp.Object {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return this._class ?? AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.RouteSection");
    }

    static new(icon: Dep<Texture2D>, section: Il2Cpp.Object): RouteSection {
        const route = this.class.alloc();
        route.method<void>(".ctor", 2).invoke(icon, section);
        Object.setPrototypeOf(route, RouteSection.prototype);
        return route;
    }
}
