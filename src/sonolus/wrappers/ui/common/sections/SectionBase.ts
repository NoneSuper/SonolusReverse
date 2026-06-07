import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Dep } from "../../../reactivity/Dep";
import { CompositeWidget } from "../../CompositeWidget";
import { Widget } from "../../Widget";

export class SectionBase extends CompositeWidget {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Sections.SectionBase"));
    }

    static createTitle(text: Dep<Il2Cpp.String>): Widget {
        return this.class.method<Widget>("CreateTitle", 1).invoke(text);
    }
}
