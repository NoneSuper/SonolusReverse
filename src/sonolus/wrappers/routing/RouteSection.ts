import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { Texture2D } from "../../../engine/wrappers/Texture";
import { Dep } from "../reactivity/Dep";

interface Api {
    RouteSection: Il2Cpp.Class;
}

export class SonolusRouteSection extends Il2Cpp.Object {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const RouteSection = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.RouteSection");

        this._api = {
            RouteSection
        };

        return this._api;
    }

    static new(icon: Dep<Texture2D>, section: Il2Cpp.Object): SonolusRouteSection {
        const route = this.api().RouteSection.alloc();
        route.method<void>(".ctor", 2).invoke(icon, section);
        Object.setPrototypeOf(route, SonolusRouteSection.prototype);
        return route;
    }
}
