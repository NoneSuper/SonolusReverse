import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { CustomSectionMod } from "../../mod/ui/Section";
import { Logger } from "../../utils/Logger";
import { RouteSection } from "../wrappers/routing/RouteSection";

export class SectionsHook {
    private static _routeSection: Il2Cpp.Class;
    private static _settingsRoute: Il2Cpp.Class;

    private static _router: Il2Cpp.Object;

    static init(): void {
        const Route = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.Route");

        this._routeSection = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routing.RouteSection");
        this._settingsRoute = AssemblyHelper.AssemblyCSharp.class("Sonolus.Routes.SettingsRoute");

        // @ts-ignore
        // Sonolus.Routing.RouteContent Sections(Sonolus.Routing.RouteSection[] sections);
        Route.method<Il2Cpp.Object>("Sections", 1).implementation = this.sectionHook;

        Logger.info("[SectionsHook::init] Initialized");
    }

    private static sectionHook(this: Il2Cpp.Object, sections: Il2Cpp.Array<RouteSection>): Il2Cpp.Object {
        const route = this;
        SectionsHook._router = route.method<Il2Cpp.Object>("get_Router", 0).invoke();

        // If this is not Settings Route return original sections
        if (route.class !== SectionsHook._settingsRoute) return this.method<Il2Cpp.Object>("Sections", 1).invoke(sections);

        const newSection: RouteSection = CustomSectionMod.buildCustomSection();

        const newSectionsArray = Il2Cpp.array<RouteSection>(SectionsHook._routeSection, sections.length + 1);
        newSectionsArray.set(0, newSection);

        for (let i = 0; i < sections.length; i++) {
            newSectionsArray.set(i + 1, sections.get(i));
        }

        return this.method<Il2Cpp.Object>("Sections", 1).invoke(newSectionsArray);
    }

    static get router(): Il2Cpp.Object {
        return this._router;
    }
}
