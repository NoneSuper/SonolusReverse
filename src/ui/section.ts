import { Config } from "../data/config";
import { getThemeAction } from "../data/state";
import { Themes } from "../data/themes";
import { I18n } from "../i18n/i18n";
import { Logger } from "../logger/logger";
import { getAssetTexture2D, makeBoolRef, makeStringRef, wrapInCustomSection, wrapString, wrapTexture2D } from "../utils/helpers";
import { FilePicker } from "../utils/native/file-picker";
import { SonolusUtils } from "../utils/version";
import { buildBtnField, buildImgLblBtn, buildRows, buildSectionHeader, buildToggleField, buildTxtInputField } from "./widgets";

/*
Building our custom section here.
*/

function buildSpoofToggle(): Il2Cpp.Object {
    const ref = makeBoolRef(Config.spoofEnabled, value => {
        Config.spoofEnabled = value;
        Config.save();
    });

    return buildToggleField({
        title: I18n.tRef("ui.spoof.title"),
        description: I18n.tRef("ui.spoof.description"),
        value: ref,
        defaultValue: true
    });
}

function buildThemesShortcut(): Il2Cpp.Object {
    const importButton = buildImgLblBtn({
        icon: wrapTexture2D(getAssetTexture2D("Import")),
        title: I18n.tRef("ui.theme.import_button"),
        onClick: () => {
            FilePicker.pickFile(
                (path: Il2Cpp.String) => {
                    if (!path.isNull()) {
                        Logger.debug(`[section] Custom theme selected: ${path.content}`);
                        // TODO: re-load themes
                    }
                },
                ["json"]
            );
        }
    });

    const selectButton = buildImgLblBtn({
        icon: wrapTexture2D(getAssetTexture2D("Theme")),
        title: I18n.tRef("ui.theme.select_button"),
        onClick: () => {
            const action = getThemeAction();
            if (!action) {
                Logger.warn("[section] themes shortcut clicked but native Theme Action not captured yet");
                return;
            }
            action.method<void>("Invoke", 0).invoke();
        }
    });

    return buildBtnField({
        title: I18n.tRef("ui.theme.title"),
        description: I18n.tRef("ui.theme.description", Themes.getLoadedThemes().length),
        buttons: [importButton, selectButton]
    });
}

function buildVersionSpoofField(): Il2Cpp.Object {
    const ref = makeStringRef(Config.versionOverride, value => {
        Config.versionOverride = value;
        Config.save();
    });

    return buildTxtInputField({
        title: I18n.tRef("ui.version_spoof.title"),
        description: I18n.tRef("ui.version_spoof.description", SonolusUtils.getSonolusVersion()),
        value: ref,
        placeholder: wrapString(SonolusUtils.getSonolusVersion()),
        characterLimit: 32
    });
}

function buildAccountField(): Il2Cpp.Object {
    const exportButton = buildImgLblBtn({
        icon: wrapTexture2D(getAssetTexture2D("Export")),
        title: I18n.tRef("ui.account.export"),
        onClick: () => {
            Logger.debug("Button export clicked!");
        }
    });

    const importButton = buildImgLblBtn({
        icon: wrapTexture2D(getAssetTexture2D("Import")),
        title: I18n.tRef("ui.account.import"),
        onClick: () => {
            Logger.debug("Button import clicked!");
        }
    });

    const field = buildBtnField({
        title: I18n.tRef("ui.account.title"),
        description: I18n.tRef("ui.account.description"),
        buttons: [exportButton, importButton]
    });

    return field;
}

export function buildCustomSection(): Il2Cpp.Object {
    const header = buildSectionHeader(I18n.tRef("ui.title"));
    const spoofToggle = buildSpoofToggle();
    const themes = buildThemesShortcut();
    const versionField = buildVersionSpoofField();
    const accountField = buildAccountField();

    return wrapInCustomSection(buildRows(20, [header, spoofToggle, themes, versionField, accountField]));
}
