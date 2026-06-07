import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Widget } from "../../Widget";
import { SectionBase } from "./SectionBase";

export class CustomSection extends SectionBase {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Sections.CustomSection"));
    }

    static new(): CustomSection {
        const obj = this._new<CustomSection>();
        obj.setRequired(["Content"]);
        return obj;
    }

    Content(content: Widget): this {
        this.method<void>("SetContent", 1).invoke(content);
        this.setMark("Content");
        return this;
    }
}
