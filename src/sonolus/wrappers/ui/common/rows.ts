import { AssemblyHelper } from "../../../../engine/assembly-helper";
import { SonolusNativeWidget } from "../native-widget";
import { SonolusWidget } from "../widget";
import { WidgetUtils } from "../widget-utils";

interface Api {
    Rows: Il2Cpp.Class;
}

export class SonolusRows extends SonolusNativeWidget {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const Rows = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Rows");

        this._api = {
            Rows
        };

        return this._api;
    }

    static new(): SonolusRows {
        return SonolusRows._new<SonolusRows>(this.api().Rows);
    }

    Gap(gap: number): this {
        this.method<void>("SetGap", 1).invoke(gap);
        return this;
    }

    Children(children: SonolusWidget[]): this {
        return WidgetUtils.Children(this, children) as this;
    }
}
