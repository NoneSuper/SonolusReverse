import { AssemblyHelper } from "../core/assembly-helper";
import { Logger } from "../logger/logger";
import { getAssetTexture2D, wrapTexture2D } from "../utils/helpers";
import { buildCustomSection } from "./section";

/*
Adds the Custom section to the Sonolus Settings page.
We hooking Sections method and adding our new RouteSection in sections array
*/

export function initSettingsUI(): void {
    // Classes
    const Route = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.Route");
    const RouteSection = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.RouteSection");
    // SettingsRoute extends Sonolus.Routing.Route
    const SettingsRoute = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routes.SettingsRoute");

    // Methods
    // We need RouteSection(Sonolus.Reactivity.Dep<UnityEngine.Texture2D> Icon, Sonolus.UI.Common.Sections.SectionBase Section);
    const RouteSectionCtor = RouteSection.method<void>(".ctor", 2).overload(
        "Sonolus.Reactivity.Dep<UnityEngine.Texture2D>",
        "Sonolus.UI.Common.Sections.SectionBase"
    );
    const Sections = Route.method<Il2Cpp.Object>("Sections", 1);

    function buildCustomRouteSection(icon: Il2Cpp.Object): Il2Cpp.Object {
        const route = RouteSection.alloc();
        // @ts-ignore We are using invokeRaw here, cuz we already defined method above and allocated object
        RouteSectionCtor.invokeRaw(route, icon, buildCustomSection());
        return route;
    }

    // @ts-ignore
    Sections.implementation = function (this: Il2Cpp.Object, sections: Il2Cpp.Array<Il2Cpp.Object>): Il2Cpp.Object {
        const route = this;
        // If this is not Settings Route return original sections
        if (route.class !== SettingsRoute) return this.method<Il2Cpp.Object>("Sections", 1).invoke(sections);

        Logger.debug(`[Route::Sections] original sections length=${sections.length}`);
        const icon = wrapTexture2D(getAssetTexture2D("IconStar"));

        const newSectionsArray = Il2Cpp.array<Il2Cpp.Object>(RouteSection, sections.length + 1);
        newSectionsArray.set(0, buildCustomRouteSection(icon));

        for (let i = 0; i < sections.length; i++) {
            newSectionsArray.set(i + 1, sections.get(i));
        }

        return this.method<Il2Cpp.Object>("Sections", 1).invoke(newSectionsArray);
    };
}
