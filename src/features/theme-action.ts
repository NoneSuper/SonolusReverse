import { BaseModule } from "../core/base-module";
import { getThemeAction, setThemeAction } from "../data/state";
import { Logger } from "../logger/logger";
import { api } from "../ui/api";
import { getAssetTexture2D } from "../ui/widgets/helpers";

/*
Instead creating own System.Action of opening themes, we just steal it from original one
*/

export class ThemeAction extends BaseModule {
    public readonly tag = "ThemeAction";

    private _themeTexture: Il2Cpp.Object | null = null;

    // Classes
    private ImgLblBtn!: Il2Cpp.Class;

    // Methods
    private onClick!: Il2Cpp.Method;

    public init(): void {
        this.ImgLblBtn = api().ImgLblBtn;

        this.onClick = this.ImgLblBtn.method("OnClick", 1).overload("System.Action");
    }

    public override initHooks(): void {
        const module = this;

        //@ts-ignore
        this.onClick.implementation = function (action: Il2Cpp.Object): Il2Cpp.Object {
            const returnValue = this.method<Il2Cpp.Object>("OnClick", 1).overload("System.Action").invoke(action);
            // If there's already saved action
            if (getThemeAction()) return returnValue;

            const button = this;
            const themeTexture = module.getThemeTexture();
            if (!themeTexture) return returnValue;

            const iconObject = button.field<Il2Cpp.Object>("_icon").value; // Dep<Texture2D>
            if (iconObject.isNull()) return returnValue;

            const texture = iconObject.method<Il2Cpp.Object>("get_Value").invoke(); // Texture2D
            // compare with Theme Texture, if equals, save it
            if (texture.isNull() || !texture.equals(themeTexture)) return returnValue;

            action.ref(true);
            setThemeAction(action);
            Logger.info("[ImgLblBtn::OnClick] saved Theme action");

            return returnValue;
        };
    }

    private getThemeTexture(): Il2Cpp.Object | null {
        if (this._themeTexture) return this._themeTexture;
        try {
            const texture = getAssetTexture2D("Theme");
            if (texture.isNull()) return null;
            this._themeTexture = texture;
            return this._themeTexture;
        } catch (error: any) {
            Logger.warn(`[${this.tag}::getThemeTexture] Sonolus.Assets.Theme not ready yet: ${error}`);
            return null;
        }
    }
}
