import { Logger } from "../logger/logger";

let spoofEnabledRef: Il2Cpp.Object | null = null;
let themeAction: Il2Cpp.Object | null = null;

export function setSpoofEnabledRef(ref: Il2Cpp.Object): void {
    spoofEnabledRef = ref;
}

export function setThemeAction(action: Il2Cpp.Object): void {
    themeAction = action;
}

export function getThemeAction(): Il2Cpp.Object | null {
    return themeAction;
}

export function isSpoofEnabled(): boolean {
    if (!spoofEnabledRef) return true;
    try {
        return spoofEnabledRef.field<boolean>("_value").value;
    } catch (e) {
        Logger.error(`[state] isSpoofEnabled error: ${(e as Error).message ?? e}`);
        return true;
    }
}

// https://rosepinetheme.com
// idk, I thinks it's incorrect, not mine
export const CUSTOM_THEME = {
    name: "sr_custom_001",
    title: "Rosé Pine",
    colors: {
        mainBackground: "#191724",
        mainSurface: "#1f1d2e",
        mainBackgroundAltFirst: "#21202e",
        mainBackgroundAltSecond: "#26233a",

        buttonDisabled: "#2a283e",
        buttonNormal: "#403d52",
        buttonHighlighted: "#c4a7e7",
        buttonPressed: "#524f67",

        mainSuccess: "#9ccfd8",
        mainWarning: "#eb6f92",

        textNormal: "#e0def4",
        textDisabled: "#6e6a86"
    }
};
