import { getThemeAction, setSpoofEnabledRef, setVersionSpoofRef } from "../data/state";
import { I18n } from "../i18n/i18n";
import { Logger } from "../logger/logger";
import { allocPinnedBoolRef, allocPinnedStringRef, getAssetTexture2D, wrapInCustomSection, wrapString, wrapTexture2D } from "../utils/helpers";
import { getSonolusVersion } from "../utils/version";
import { buildBtnField, buildImgLblBtn, buildRows, buildSectionHeader, buildToggleField, buildTxtInputField } from "./widgets";

// TODO: rewrite later with config system
let sharedRef: Il2Cpp.Object | null = null;
let versionRef: Il2Cpp.Object | null = null;

function getSharedRef(): Il2Cpp.Object {
    if (sharedRef) return sharedRef;
    sharedRef = allocPinnedBoolRef(true);
    setSpoofEnabledRef(sharedRef);
    return sharedRef;
}

function getVersionRef(): Il2Cpp.Object {
    if (versionRef) return versionRef;
    versionRef = allocPinnedStringRef("");
    setVersionSpoofRef(versionRef);
    return versionRef;
}

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

function buildVersionSpoofField(): Il2Cpp.Object {
    return buildTxtInputField({
        title: I18n.tRef("ui.version_spoof.title"),
        description: I18n.tRef("ui.version_spoof.description", getSonolusVersion()),
        value: getVersionRef(),
        placeholder: wrapString(getSonolusVersion()),
        characterLimit: 32
    });
}

export function buildCustomSection(): Il2Cpp.Object {
    const header = buildSectionHeader(I18n.tRef("ui.title"));
    const spoofToggle = buildToggleField({
        title: I18n.tRef("ui.spoof.title"),
        description: I18n.tRef("ui.spoof.description"),
        value: getSharedRef(),
        defaultValue: true
    });
    const versionField = buildVersionSpoofField();
    const themes = buildThemesShortcut();
    return wrapInCustomSection(buildRows(20, [header, spoofToggle, versionField, themes]));
}
