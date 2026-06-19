import { Path } from "../../engine/native/Path";
import { Assets } from "../../sonolus/wrappers/Assets";
import { Dep } from "../../sonolus/wrappers/reactivity/Dep";
import { RouteSection } from "../../sonolus/wrappers/routing/RouteSection";
import { BtnField } from "../../sonolus/wrappers/ui/common/fields/BtnField";
import { ToggleField } from "../../sonolus/wrappers/ui/common/fields/ToggleField";
import { ImgLblBtn } from "../../sonolus/wrappers/ui/common/ImgLblBtn";
import { Rows } from "../../sonolus/wrappers/ui/common/Rows";
import { CustomSection } from "../../sonolus/wrappers/ui/common/sections/CustomSection";
import { SectionBase } from "../../sonolus/wrappers/ui/common/sections/SectionBase";
import { Widget } from "../../sonolus/wrappers/ui/Widget";
import { WidgetUtils } from "../../sonolus/wrappers/ui/WidgetUtils";
import { Config } from "../data/Config";
import { Constants } from "../data/Constants";
import { ModPreferences } from "../data/ModPreferences";
import { ThemeLoader } from "../data/ThemeLoader";
import { I18n } from "../i18n/I18n";
import { SectionUtils } from "./SectionUtils";

export class CustomSectionMod {
    private static readonly SECTION_ICON_NAME: string = "IconStar";

    static buildCustomSection(): RouteSection {
        const title = this.title();
        const spoofField = this.spoofField();
        const versionField = this.versionField();
        const themeField = this.themeField();

        const rows = Rows.new().gap(20).children([title, spoofField, versionField, themeField]);

        const section = CustomSection.new().content(rows).validate();

        const icon = Dep.opImplicit(Assets.getAsset(this.SECTION_ICON_NAME));
        const route = RouteSection.new(icon, section);
        return route;
    }

    private static title(): Widget {
        // later this information will be in About Tab
        return SectionBase.createTitle(
            /// #if DEV
            I18n.tRef("ui.title_dev", ModPreferences.VERSION, ModPreferences.COMMIT, ModPreferences.ENV),
            /// #else
            // @ts-ignore
            I18n.tRef("ui.title", ModPreferences.VERSION)
            /// #endif
        );
    }

    private static spoofField(): ToggleField {
        const valueRef = Config.registerOrGet("spoofEnabled", Config.spoofEnabled);

        return ToggleField.new().title(I18n.tRef("ui.spoof.title")).description(I18n.tRef("ui.spoof.description")).value(valueRef).validate();
    }

    private static versionField(): ToggleField {
        const valueRef = Config.registerOrGet("versionCheck", Config.versionCheck);

        return ToggleField.new().title(I18n.tRef("ui.version_check.title")).description(I18n.tRef("ui.version_check.description")).value(valueRef).validate();
    }

    private static themeField(): BtnField {
        return BtnField.new()
            .title(I18n.tRef("ui.theme.title"))
            .description(I18n.tRef("ui.theme.description", ThemeLoader.loadedThemes.size, Path.customThemesPath, Constants.WIKI_URL))
            .value(SectionUtils.themeValueRef())
            .btns([this.refreshBtn(), this.importBtn(), this.themeBtn()])
            .validate();
    }

    private static refreshBtn(): ImgLblBtn {
        return ImgLblBtn.new()
            .title(I18n.tRef("ui.theme.refresh_button"))
            .icon(Dep.opImplicit(Assets.getAsset("Refresh")))
            .onClick(() => SectionUtils.refreshAndNotify())
            .validate();
    }

    private static importBtn(): ImgLblBtn {
        const btn = ImgLblBtn.new()
            .title(I18n.tRef("ui.theme.import_button"))
            .icon(Dep.opImplicit(Assets.getAsset("Import")))
            .onClick(() => SectionUtils.onThemeImportPicked())
            .validate();

        return WidgetUtils.margin(btn, 20, 0, 0, 0) as ImgLblBtn;
    }

    private static themeBtn(): ImgLblBtn {
        const btn = ImgLblBtn.new()
            .title(I18n.tRef("ui.theme.select_button"))
            .icon(Dep.opImplicit(Assets.getAsset("Theme")))
            .enabled(false)
            .validate();

        return WidgetUtils.margin(btn, 20, 0, 0, 0) as ImgLblBtn;
    }
}
