import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { SonolusNativeWidget } from "../NativeWidget";
import { SonolusWidget } from "../Widget";
import { WidgetUtils } from "../WidgetUtils";

export class SonolusRows extends SonolusNativeWidget {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Rows"));
    }

    static new(): SonolusRows {
        return this._new<SonolusRows>();
    }

    Gap(gap: number): this {
        this.method<void>("SetGap", 1).invoke(gap);
        return this;
    }

    Children(children: SonolusWidget[]): this {
        return WidgetUtils.Children(this, children) as this;
    }
}
