import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { System } from "../../../../engine/System";
import { Texture2D } from "../../../../engine/wrappers/Texture";
import { Dep } from "../../reactivity/Dep";
import { SonolusCompositeWidget } from "../CompositeWidget";

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
        const obj = SonolusImgLblBtn._new<SonolusImgLblBtn>(this.api().ImgLblBtn);
        obj.setRequired(["Title", "Icon"]);
        return obj;
    }

    Title(title: Dep<Il2Cpp.String>): this {
        this.method<Il2Cpp.Object>("SetTitle").invoke(title);
        this.setMark("Title");
        return this;
    }

    Icon(icon: Dep<Texture2D>): this {
        this.method<Il2Cpp.Object>("SetIcon").invoke(icon);
        this.setMark("Icon");
        return this;
    }

    OnClick(onClick: () => void) {
        this.method<Il2Cpp.Object>("SetOnClick").invoke(Il2Cpp.delegate(System.Action, onClick));
        return this;
    }
}
