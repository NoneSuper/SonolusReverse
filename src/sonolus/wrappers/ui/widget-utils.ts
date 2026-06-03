import { AssemblyHelper } from "../../../engine/assembly-helper";

interface Api {
    Margin: Il2Cpp.Method<Il2Cpp.Object>;
}

/** Wrapper over `Sonolus.UI.WidgetUtils` */
export class WidgetUtils {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const Asm = AssemblyHelper.AssemblyCSharp;

        const Widget = Asm.class("Sonolus.UI.Widget");
        const WidgetUtils = Asm.class("Sonolus.UI.WidgetUtils");

        const Margin = WidgetUtils.method<Il2Cpp.Object>("Margin", 5).inflate(Widget);

        this._api = {
            Margin
        };

        return this._api;
    }

    /**
     * Wrapper over `Sonolus.UI.WidgetUtils.Margin<Sonolus.UI.Widget>`
     * Inflated with `Sonolus.UI.Widget`
     *
     * @returns `Sonolus.UI.Widget`
     */
    static Margin(Widget: Il2Cpp.Object, left: number, top: number, right: number, bottom: number): Il2Cpp.Object {
        return WidgetUtils.api().Margin.invoke(Widget, left, top, right, bottom);
    }
}
