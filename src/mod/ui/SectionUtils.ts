import { FilePicker } from "../../engine/native/FilePicker";
import { Path } from "../../engine/native/Path";
import { SectionsHook } from "../../sonolus/routes/SectionsHook";
import { Assets } from "../../sonolus/wrappers/Assets";
import { Dep } from "../../sonolus/wrappers/reactivity/Dep";
import { ImgLblBtn } from "../../sonolus/wrappers/ui/common/ImgLblBtn";
import { PopupExtensions } from "../../sonolus/wrappers/ui/popup/PopupExtensions";
import { ThemeLoader } from "../data/ThemeLoader";
import { CustomThemes } from "../features/CustomThemes";
import { I18n } from "../i18n/I18n";

export class SectionUtils {
    /** `CustomThemes.refreshThemes()` and show popup */
    static refreshAndNotify(): void {
        CustomThemes.refreshThemes();
        PopupExtensions.showHelp(SectionsHook.router, I18n.t("ui.theme.popup.message"));
    }

    static onThemeImportPicked(): void {
        FilePicker.pickFile(
            (path: Il2Cpp.String) => {
                if (!path.isNull() && path.content) {
                    const filePath = path.content;
                    const distPath = Path.customThemesPath + Path.getFileNameFromPath(filePath);

                    Path.move(filePath, distPath);
                    const status = ThemeLoader.importTheme(distPath);

                    if (status !== 0) {
                        PopupExtensions.showError(SectionsHook.router, I18n.t("ui.theme.popup.message_error"), [this.okBtn()]);
                    } else {
                        this.refreshAndNotify();
                    }
                }
            },
            ["json"]
        );
    }

    static okBtn(): ImgLblBtn {
        return ImgLblBtn.new()
            .title(I18n.tRef("ui.theme.popup.ok"))
            .icon(Dep.opImplicit(Assets.getAsset("Check")))
            .validate();
    }
}
