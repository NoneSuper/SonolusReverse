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
        obj.setRequired(["title", "icon"]);
        return obj;
    }

    title(title: Dep<Il2Cpp.String>): this {
        this.method<Il2Cpp.Object>("SetTitle").invoke(title);
        this.setMark("title");
        return this;
    }

    icon(icon: Dep<Texture2D>): this {
        this.method<Il2Cpp.Object>("SetIcon").invoke(icon);
        this.setMark("icon");
        return this;
    }

    onClick(onClick: () => void): this {
        this.method<Il2Cpp.Object>("SetOnClick").invoke(Il2Cpp.delegate(System.Action, onClick));
        return this;
    }
}
