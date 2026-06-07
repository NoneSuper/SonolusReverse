import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Dep } from "../../../reactivity/Dep";
import { SonolusCompositeWidget } from "../../CompositeWidget";
import { SonolusWidget } from "../../Widget";

export class SonolusSectionBase extends SonolusCompositeWidget {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Sections.SectionBase"));
    }

    static CreateTitle(text: Dep<Il2Cpp.String>): SonolusWidget {
        return this.class.method<SonolusWidget>("CreateTitle", 1).invoke(text);
    }
}
