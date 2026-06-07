import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { NativeWidget } from "../NativeWidget";
import { Widget } from "../Widget";
import { WidgetUtils } from "../WidgetUtils";

export class Rows extends NativeWidget {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Rows"));
    }

    static new(): Rows {
        return this._new<Rows>();
    }

    Gap(gap: number): this {
        this.method<void>("SetGap", 1).invoke(gap);
        return this;
    }

    Children(children: Widget[]): this {
        return WidgetUtils.Children(this, children) as this;
    }
}
