import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { System } from "../../../../engine/System";
import { Texture2D } from "../../../../engine/wrappers/Texture";
import { Dep } from "../../reactivity/Dep";
import { CompositeWidget } from "../CompositeWidget";

export class ImgLblBtn extends CompositeWidget {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.ImgLblBtn"));
    }

    static new(): ImgLblBtn {
        const obj = this._new<ImgLblBtn>();
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
