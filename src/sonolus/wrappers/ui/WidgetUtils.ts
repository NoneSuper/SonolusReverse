import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { Widget } from "./Widget";

/** `Sonolus.UI.WidgetUtils` - static helper class for `Sonolus.UI.Widget` */
export class WidgetUtils {
    private static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.WidgetUtils"));
    }

    static margin<T extends Widget>(widget: T, left: number, top: number, right: number, bottom: number): Widget {
        return this.class.method<Widget>("Margin", 5).inflate(Widget.class).invoke(widget, left, top, right, bottom);
    }

    static children<T extends Widget>(widget: T, children: Widget[]): Widget {
        const childrenArray = Il2Cpp.array<Widget>(widget.class, children.length);
        children.forEach((c, i) => childrenArray.set(i, c));

        return this.class.method<Widget>("Children", 2).inflate(Widget.class).invoke(widget, childrenArray);
    }
}
