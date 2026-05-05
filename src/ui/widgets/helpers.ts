import { api } from "../api";

/** Wraps a JS string into `Sonolus.Reactivity.Dep<string>` */
export function wrapString(text: string): Il2Cpp.Object {
    return api().opImplicitFromString.invoke(Il2Cpp.string(text));
}

/** Wraps a `UnityEngine.Texture2D` into `Sonolus.Reactivity.Dep<Texture2D>` */
export function wrapTexture2D(texture2D: Il2Cpp.Object): Il2Cpp.Object {
    return api().opImplicitFromTexture2D.invoke(texture2D);
}

/** Allocate a `Sonolus.UI.Common.Sections.CustomSection` with content */
export function wrapInCustomSection(content: Il2Cpp.Object): Il2Cpp.Object {
    const cs = api().CustomSection.new();
    cs.method<void>("SetContent", 1).invoke(content);
    return cs;
}

/**
 * Wrapper over `Sonolus.Assets.get_{texture}`
 * You probably will need wrap it
 *
 * @returns `UnityEngine.Texture2D`
 */
export function getAssetTexture2D(iconName: string): Il2Cpp.Object {
    return api().Assets.method<Il2Cpp.Object>(`get_${iconName}`).invoke();
}

/** Create a `System.Action` using JS callback */
export function makeAction(callback: () => void): Il2Cpp.Object {
    return Il2Cpp.delegate(api().SystemAction, callback);
}

/** Allocate a `Sonolus.Reactivity.Ref<bool>(initialValue)`, pinned in GC */
export function allocPinnedBoolRef(initialValue: boolean): Il2Cpp.Object {
    const ref = api().RefBool.alloc();
    ref.method<void>(".ctor", 1).invoke(initialValue);
    ref.ref(true); // pin it in GC
    return ref;
}

/** Allocate a `Sonolus.Reactivity.Ref<string>(initialValue)`, pinned in GC. */
export function allocPinnedStringRef(initialValue: string): Il2Cpp.Object {
    const ref = api().RefString.alloc();
    ref.method<void>(".ctor", 1).invoke(Il2Cpp.string(initialValue));
    ref.ref(true); // pin it in GC
    return ref;
}
