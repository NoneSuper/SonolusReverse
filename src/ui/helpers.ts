import { AssemblyHelper } from "../core/assembly-helper";

interface Api {
    Assets: Il2Cpp.Class;
    CustomSection: Il2Cpp.Class;
    SystemAction: Il2Cpp.Class;
    RefBool: Il2Cpp.Class;
    RefString: Il2Cpp.Class;
    opImplicitFromString: Il2Cpp.Method<Il2Cpp.Object>;
    opImplicitFromTexture2D: Il2Cpp.Method<Il2Cpp.Object>;
}

let _api: Api | null = null;

function api(): Api {
    if (_api) return _api;

    const Asm = AssemblyHelper.AssemblyCSharp;

    const SystemString = Il2Cpp.corlib.class("System.String");
    const SystemBoolean = Il2Cpp.corlib.class("System.Boolean");
    const SystemAction = Il2Cpp.corlib.class("System.Action");

    const Texture2D = AssemblyHelper.CoreModule.class("UnityEngine.Texture2D");

    const Assets = Asm.class("Sonolus.Assets");

    const CustomSection = Asm.class("Sonolus.UI.Common.Sections.CustomSection");

    // Dep
    const Dep = Asm.class("Sonolus.Reactivity.Dep`1");
    const DepString = Dep.inflate(SystemString);
    const DepTexture2D = Dep.inflate(Texture2D);

    const opImplicitFromString = DepString.method<Il2Cpp.Object>("op_Implicit").overload(SystemString);
    const opImplicitFromTexture2D = DepTexture2D.method<Il2Cpp.Object>("op_Implicit").overload(Texture2D);

    // Ref
    const Ref = Asm.class("Sonolus.Reactivity.Ref`1");
    const RefBool = Ref.inflate(SystemBoolean);
    const RefString = Ref.inflate(SystemString);

    _api = {
        Assets,
        CustomSection,
        SystemAction,
        RefBool,
        RefString,
        opImplicitFromString,
        opImplicitFromTexture2D
    };
    
    return _api;
}

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
