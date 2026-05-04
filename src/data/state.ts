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
