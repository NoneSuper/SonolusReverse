import { setThemeAction } from "../data/state";
import { Logger } from "../logger/logger";
import { api } from "../ui/widgets/api";
import { getAssetTexture2D } from "../ui/widgets/helpers";

/*
Instead creating own System.Action of opening themes, we just steal it from original one
*/

let _themeTexture: Il2Cpp.Object | null = null;

export function initCaptureTheme(): void {
    const ImgLblBtn = api().ImgLblBtn;

    const onClick = ImgLblBtn.method("OnClick", 1).overload("System.Action");

    function getThemeTexture(): Il2Cpp.Object | null {
        if (_themeTexture) return _themeTexture;
        try {
            const texture = getAssetTexture2D("Theme"); // Texture2D
            if (texture.isNull()) return null;
            _themeTexture = texture;
            return _themeTexture;
        } catch (error) {
            Logger.warn(`[ThemeAction::getThemeTexture] Assets.Theme not ready yet: ${error}`);
            return null;
        }
    }

    // @ts-ignore
    onClick.implementation = function (action: Il2Cpp.Object): Il2Cpp.Object {
        const button = this;
        const returnValue = this.method<Il2Cpp.Object>("OnClick", 1).overload("System.Action").invoke(action);

        const themeTexture = getThemeTexture();
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
