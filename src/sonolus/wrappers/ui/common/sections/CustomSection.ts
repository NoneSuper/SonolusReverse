import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { SonolusWidget } from "../../Widget";
import { SonolusBaseSection } from "./BaseSection";

interface Api {
    CustomSection: Il2Cpp.Class;
}

export class SonolusCustomSection extends SonolusBaseSection {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const CustomSection = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Sections.CustomSection");

        this._api = {
            CustomSection
        };

        return this._api;
    }

    static new(): SonolusCustomSection {
        return SonolusCustomSection._new<SonolusCustomSection>(this.api().CustomSection);
    }

    Content(content: SonolusWidget): this {
        this.method<void>("SetContent", 1).invoke(content);
        return this;
    }
}
