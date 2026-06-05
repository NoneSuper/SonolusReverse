import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { CustomSection } from "../../mod/ui/Section";
import { SonolusRouteSection } from "../wrappers/routing/RouteSection";

export class SonolusRoutesSettings {
    private static _routeSection: Il2Cpp.Class;
    private static _settingsRoute: Il2Cpp.Class;

    static init(): void {
        const Route = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.Route");

        this._routeSection = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.RouteSection");
        this._settingsRoute = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routes.SettingsRoute");

        // @ts-ignore
        // Sonolus.Routing.RouteContent Sections(Sonolus.Routing.RouteSection[] sections);
        Route.method<Il2Cpp.Object>("Sections", 1).implementation = this.sectionHook;
    }

    private static sectionHook(this: Il2Cpp.Object, sections: Il2Cpp.Array<SonolusRouteSection>): Il2Cpp.Object {
        const route = this;

        // If this is not Settings Route return original sections
        if (route.class !== SonolusRoutesSettings._settingsRoute) return this.method<Il2Cpp.Object>("Sections", 1).invoke(sections);

        const newSection: SonolusRouteSection = CustomSection.buildCustomSection();

        const newSectionsArray = Il2Cpp.array<SonolusRouteSection>(SonolusRoutesSettings._routeSection, sections.length + 1);
        newSectionsArray.set(0, newSection);

        for (let i = 0; i < sections.length; i++) {
            newSectionsArray.set(i + 1, sections.get(i));
        }

        return this.method<Il2Cpp.Object>("Sections", 1).invoke(newSectionsArray);
    }
}
