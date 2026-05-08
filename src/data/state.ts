import { Logger } from "../logger/logger";

// TODO: rewrite it for json config
let spoofEnabledRef: Il2Cpp.Object | null = null;
let versionSpoofRef: Il2Cpp.Object | null = null;
let themeAction: Il2Cpp.Object | null = null;


export function setVersionSpoofRef(ref: Il2Cpp.Object): void {
    versionSpoofRef = ref;
}

export function getVersionSpoofRef(): Il2Cpp.Object | null {
    return versionSpoofRef;
}

export function getVersionSpoofValue(): string {
    if (!versionSpoofRef) return "";
    try {
        const s = versionSpoofRef.field<Il2Cpp.String>("_value").value;
        return s.isNull() ? "" : (s.content ?? "");
    } catch (e) {
        Logger.error(`[state] getVersionSpoofValue error: ${e}`);
        return "";
    }
}

export function setThemeAction(action: Il2Cpp.Object): void {
    themeAction = action;
}

export function getThemeAction(): Il2Cpp.Object | null {
    return themeAction;
}

export function setSpoofEnabledRef(ref: Il2Cpp.Object): void {
    spoofEnabledRef = ref;
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
// idk, I think it's incorrect, not mine
export const CUSTOM_THEME = {
    name: "sr_custom_003",
    title: "Rosé Pine 2",
    colors: {
        mainBackground: "#191724", 
        mainSurface: "#1f1d2e", 
        mainBackgroundAltFirst: "#21202e",
        mainBackgroundAltSecond: "#26233a",

        buttonNormal: "#c4a7e740",
        buttonHighlighted: "#c4a7e780",
        buttonPressed: "#c4a7e720",
        buttonDisabled: "#c4a7e710",

        mainSuccess: "#9ccfd8",
        mainWarning: "#eb6f92",

        textNormal: "#e0def4",
        textDisabled: "#e0def440"
    }
};
