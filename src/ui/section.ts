import { getThemeAction, setSpoofEnabledRef } from "../data/state";
import { Logger } from "../logger/logger";
import { I18n } from "../i18n/i18n";
import { allocPinnedBoolRef, getAssetTexture2D, wrapInCustomSection, wrapTexture2D } from "./widgets/helpers";
import { buildBtnField, buildImgLblBtn, buildRows, buildSectionHeader, buildToggleField } from "./widgets/builders";

// TODO: rewrite later with config system
let sharedRef: Il2Cpp.Object | null = null;

function getSharedRef(): Il2Cpp.Object {
    if (sharedRef) return sharedRef;
    sharedRef = allocPinnedBoolRef(true);
    setSpoofEnabledRef(sharedRef);
    return sharedRef;
}

function buildThemesShortcut(): Il2Cpp.Object {
    const openButton = buildImgLblBtn({
        icon: wrapTexture2D(getAssetTexture2D("Theme")),
        title: I18n.t("ui.theme.button_title"),
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
        title: I18n.t("ui.theme.title"),
        description: I18n.t("ui.theme.description"),
        buttons: [openButton]
    });
}

export function buildCustomSection(): Il2Cpp.Object {
    const header = buildSectionHeader(I18n.t("ui.title"));
    const spoofToggle = buildToggleField({
        title: I18n.t("ui.spoof.title"),
        description: I18n.t("ui.spoof.description"),
        value: getSharedRef(),
        defaultValue: true
    });
    const themes = buildThemesShortcut();
    return wrapInCustomSection(buildRows(20, [header, spoofToggle, themes]));
}
