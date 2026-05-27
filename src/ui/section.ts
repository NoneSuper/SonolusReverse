import { Config } from "../data/config";
import { getThemeAction } from "../data/state";
import { I18n } from "../i18n/i18n";
import { Logger } from "../logger/logger";
import { getAssetTexture2D, makeBoolRef, makeStringRef, wrapInCustomSection, wrapString, wrapTexture2D } from "../utils/helpers";
import { SonolusUtils } from "../utils/version";
import { buildBtnField, buildImgLblBtn, buildRows, buildSectionHeader, buildToggleField, buildTxtInputField } from "./widgets";

/*
Adds the Custom section to the Sonolus Settings page.
*/

function buildThemesShortcut(): Il2Cpp.Object {
    const openButton = buildImgLblBtn({
        icon: wrapTexture2D(getAssetTexture2D("Theme")),
        title: I18n.tRef("ui.theme.button_title"),
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
        description: I18n.tRef("ui.theme.description"),
        buttons: [openButton]
    });
}

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
