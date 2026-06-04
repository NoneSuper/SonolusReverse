import { AssemblyHelper } from "../../../../engine/assembly-helper";
import { System } from "../../../../engine/system";
import { Texture2D } from "../../../../engine/wrappers/texture";
import { Dep } from "../../reactivity/dep";
import { SonolusCompositeWidget } from "../composite-widget";
import { SonolusWidget } from "../widget";

interface Api {
    ImgLblBtn: Il2Cpp.Class;
}

export class SonolusImgLblBtn extends SonolusCompositeWidget {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const ImgLblBtn = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.ImgLblBtn");

        this._api = {
            ImgLblBtn
        };

        return this._api;
    }

    static new(): SonolusImgLblBtn {
        return SonolusImgLblBtn._new<SonolusImgLblBtn>(this.api().ImgLblBtn);
    }

    Icon(icon: Dep<Texture2D>): this {
        this.method<Il2Cpp.Object>("SetIcon").invoke(icon);
        return this;
    }

    Title(title: Dep<Il2Cpp.String>): this {
        this.method<Il2Cpp.Object>("SetTitle").invoke(title);
        return this;
    }

    OnClick(onClick: () => void) {
        this.method<Il2Cpp.Object>("SetOnClick").invoke(Il2Cpp.delegate(System.Action, onClick));
        return this;
    }
}
