import { AssemblyHelper } from "../../../../../engine/assembly-helper";
import { Dep } from "../../../reactivity/dep";
import { SonolusCompositeWidget } from "../../composite-widget";
import { SonolusWidget } from "../../widget";

interface Api {
    SectionBase: Il2Cpp.Class;
}

export class SonolusBaseSection extends SonolusCompositeWidget {
    private static _apiBase: Api | null = null;

    private static apiBase(): Api {
        if (this._apiBase) return this._apiBase;

        const SectionBase = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Sections.SectionBase");

        this._apiBase = {
            SectionBase
        };

        return this._apiBase;
    }

    static CreateTitle(text: Dep<Il2Cpp.String>): SonolusWidget {
        return this.apiBase().SectionBase.method<SonolusWidget>("CreateTitle", 1).invoke(text);
    }
}
