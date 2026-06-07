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
        obj.setRequired(["content"]);
        return obj;
    }

    content(content: Widget): this {
        this.method<void>("SetContent", 1).invoke(content);
        this.setMark("content");
        return this;
    }
}
