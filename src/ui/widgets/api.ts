import { AssemblyHelper } from "../../core/assembly-helper";

interface WidgetApi {
    SystemString: Il2Cpp.Class;
    SystemObject: Il2Cpp.Class;
    SystemBoolean: Il2Cpp.Class;
    SystemAction: Il2Cpp.Class;

    Assets: Il2Cpp.Class;
    Texture2D: Il2Cpp.Class;

    Widget: Il2Cpp.Class;
    Rows: Il2Cpp.Class;
    SectionBase: Il2Cpp.Class;
    CustomSection: Il2Cpp.Class;
    ToggleField: Il2Cpp.Class;
    BtnField: Il2Cpp.Class;
    ImgLblBtn: Il2Cpp.Class;
    RefBool: Il2Cpp.Class;
    RefString: Il2Cpp.Class;

    opImplicitFromString: Il2Cpp.Method<Il2Cpp.Object>;
    opImplicitFromTexture2D: Il2Cpp.Method<Il2Cpp.Object>;
    widgetUtilsChildren: Il2Cpp.Method<Il2Cpp.Object>;
}

let _api: WidgetApi | null = null;

export function api(): WidgetApi {
    if (_api) return _api;

    const Asm = AssemblyHelper.AssemblyCSharp;

    const SystemString = Il2Cpp.corlib.class("System.String");
    const SystemObject = Il2Cpp.corlib.class("System.Object");
    const SystemBoolean = Il2Cpp.corlib.class("System.Boolean");
    const SystemAction = Il2Cpp.corlib.class("System.Action");

    const Assets = Asm.class("Sonolus.Assets");
    // Alternative: Assets.method<Il2Cpp.Object>("get_IconStar").returnType.class;
    const Texture2D = AssemblyHelper.CoreModule.class("UnityEngine.Texture2D");

    const Widget = Asm.class("Sonolus.UI.Widget");
    const WidgetUtils = Asm.class("Sonolus.UI.WidgetUtils");
    const SectionBase = Asm.class("Sonolus.UI.Common.Sections.SectionBase");
    const CustomSection = Asm.class("Sonolus.UI.Common.Sections.CustomSection");
    const Rows = Asm.class("Sonolus.UI.Common.Rows");

    const ToggleField = Asm.class("Sonolus.UI.Common.Fields.ToggleField");
    const BtnField = Asm.class("Sonolus.UI.Common.Fields.BtnField");
    const ImgLblBtn = Asm.class("Sonolus.UI.Common.ImgLblBtn"); // Button with label and Icon

    const DepString = Asm.class("Sonolus.Reactivity.Dep`1").inflate(SystemString);
    const DepTexture2D = Asm.class("Sonolus.Reactivity.Dep`1").inflate(Texture2D);
    const RefBool = Asm.class("Sonolus.Reactivity.Ref`1").inflate(SystemBoolean);
    const RefString = Asm.class("Sonolus.Reactivity.Ref`1").inflate(SystemString);

    // Methods
    const opImplicitFromString = DepString.method<Il2Cpp.Object>("op_Implicit").overload(SystemString);
    const opImplicitFromTexture2D = DepTexture2D.method<Il2Cpp.Object>("op_Implicit").overload(Texture2D);
    const widgetUtilsChildren = WidgetUtils.method<Il2Cpp.Object>("Children", 2).inflate(SystemObject);

    _api = {
        SystemString,
        SystemObject,
        SystemBoolean,
        SystemAction,
        Widget,
        Rows,
        SectionBase,
        CustomSection,
        ToggleField,
        BtnField,
        ImgLblBtn,
        RefBool,
        RefString,
        Assets,
        Texture2D,
        opImplicitFromString,
        opImplicitFromTexture2D,
        widgetUtilsChildren
    };
    return _api;
}
