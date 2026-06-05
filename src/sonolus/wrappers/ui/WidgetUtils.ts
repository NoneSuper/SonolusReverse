import { AssemblyHelper } from "../../../engine/AssemblyHelper";
import { SonolusWidget } from "./Widget";

interface Api {
    Margin: Il2Cpp.Method<Il2Cpp.Object>;
    Children: Il2Cpp.Method<Il2Cpp.Object>;
}

/** Wrapper over `Sonolus.UI.WidgetUtils` class */
export class WidgetUtils {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const Asm = AssemblyHelper.AssemblyCSharp;

        const Widget = Asm.class("Sonolus.UI.Widget");
        const WidgetUtils = Asm.class("Sonolus.UI.WidgetUtils");

        const Margin = WidgetUtils.method<Il2Cpp.Object>("Margin", 5).inflate(Widget);
        const Children = WidgetUtils.method<Il2Cpp.Object>("Children", 2).inflate(Widget);

        this._api = {
            Margin,
            Children
        };

        return this._api;
    }

    /**
     * Wrapper over `Sonolus.UI.WidgetUtils.Margin<Sonolus.UI.Widget>`
     * Inflated with `Sonolus.UI.Widget`
     *
     * @returns `Sonolus.UI.Widget`
     */
    static Margin<T extends SonolusWidget>(widget: T, left: number, top: number, right: number, bottom: number): Il2Cpp.Object {
        return WidgetUtils.api().Margin.invoke(widget, left, top, right, bottom);
    }

    static Children<T extends SonolusWidget>(widget: T, children: SonolusWidget[]): Il2Cpp.Object {
        const childrenArray = Il2Cpp.array<SonolusWidget>(widget.class, children.length);
        children.forEach((c, i) => childrenArray.set(i, c));

        return WidgetUtils.api().Children.invoke(widget, childrenArray);
    }
}
