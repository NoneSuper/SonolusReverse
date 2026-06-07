import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { SonolusWidget } from "./Widget";

/** Wrapper over `Sonolus.UI.WidgetUtils` class */
export class WidgetUtils {
    private static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.WidgetUtils"));
    }

    /**
     * Wrapper over `Sonolus.UI.WidgetUtils.Margin<Sonolus.UI.Widget>`
     * Inflated with `Sonolus.UI.Widget`
     *
     * @returns `Sonolus.UI.Widget`
     */
    static Margin<T extends SonolusWidget>(widget: T, left: number, top: number, right: number, bottom: number): SonolusWidget {
        return this.class.method<SonolusWidget>("Margin", 5).inflate(SonolusWidget.class).invoke(widget, left, top, right, bottom);
    }

    static Children<T extends SonolusWidget>(widget: T, children: SonolusWidget[]): SonolusWidget {
        const childrenArray = Il2Cpp.array<SonolusWidget>(widget.class, children.length);
        children.forEach((c, i) => childrenArray.set(i, c));

        return this.class.method<SonolusWidget>("Children", 2).inflate(SonolusWidget.class).invoke(widget, childrenArray);
    }
}
