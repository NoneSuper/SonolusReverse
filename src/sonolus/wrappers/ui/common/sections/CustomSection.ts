import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { SonolusWidget } from "../../Widget";
import { SonolusSectionBase } from "./SectionBase";

export class SonolusCustomSection extends SonolusSectionBase {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Sections.CustomSection"));
    }

    static new(): SonolusCustomSection {
        const obj = this._new<SonolusCustomSection>();
        obj.setRequired(["Content"]);
        return obj;
    }

    Content(content: SonolusWidget): this {
        this.method<void>("SetContent", 1).invoke(content);
        this.setMark("Content");
        return this;
    }
}
