import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { NativeWidget } from "../NativeWidget";
import { Widget } from "../Widget";
import { WidgetUtils } from "../WidgetUtils";

/** `Sonolus.UI.Common.Rows` - Rows layout for Section (extends NativeWidget) */
export class Rows extends NativeWidget {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Rows"));
    }

    static new(): Rows {
        return this._new<Rows>();
    }

    gap(gap: number): this {
        this.method<void>("SetGap", 1).invoke(gap);
        return this;
    }

    children(children: Widget[]): this {
        return WidgetUtils.children(this, children) as this;
    }
}
