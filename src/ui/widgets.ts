import { AssemblyHelper } from "../core/assembly-helper";
import { getAssetTexture2D, makeAction, wrapBool, wrapString, wrapTexture2D } from "../utils/helpers";
import { WidgetUtils } from "../utils/widget-utils";

/*
Builders for some amazing Sonolus UI widgets.
Everything UI is a CompositeWidget, like in Flutter
TODO: document this more (types)
*/

interface Api {
    SystemString: Il2Cpp.Class;
    SystemAction: Il2Cpp.Class;
    Rows: Il2Cpp.Class;
    Widget: Il2Cpp.Class;
    SectionBase: Il2Cpp.Class;
    ToggleField: Il2Cpp.Class;
    BtnField: Il2Cpp.Class;
    TxtInputField: Il2Cpp.Class;
    ImgLblBtn: Il2Cpp.Class;
    widgetUtilsChildren: Il2Cpp.Method<Il2Cpp.Object>;
}

let _api: Api | null = null;

function api(): Api {
    if (_api) return _api;

    const Asm = AssemblyHelper.AssemblyCSharp;

    const SystemString = Il2Cpp.corlib.class("System.String");
    const SystemObject = Il2Cpp.corlib.class("System.Object");
    const SystemAction = Il2Cpp.corlib.class("System.Action");

    const Rows = Asm.class("Sonolus.UI.Common.Rows");

    const Widget = Asm.class("Sonolus.UI.Widget");
    const WidgetUtils = Asm.class("Sonolus.UI.WidgetUtils");

    const SectionBase = Asm.class("Sonolus.UI.Common.Sections.SectionBase");
    const ToggleField = Asm.class("Sonolus.UI.Common.Fields.ToggleField");
    const BtnField = Asm.class("Sonolus.UI.Common.Fields.BtnField");
    const TxtInputField = Asm.class("Sonolus.UI.Common.Fields.TxtInputField");
    const ImgLblBtn = Asm.class("Sonolus.UI.Common.ImgLblBtn");

    const widgetUtilsChildren = WidgetUtils.method<Il2Cpp.Object>("Children", 2).inflate(SystemObject);

    _api = {
        SystemString,
        SystemAction,
        Rows,
        Widget,
        SectionBase,
        ToggleField,
        BtnField,
        TxtInputField,
        ImgLblBtn,
        widgetUtilsChildren
    };
    return _api;
}

export function buildRows(gap: number, children: Il2Cpp.Object[]): Il2Cpp.Object {
    const rows = api().Rows.new(); // call alloc + il2cpp_object_initialize export

    rows.method<Il2Cpp.Object>("Gap", 1).invoke(gap); // settings gap

    // Allocate Il2cpp.Array with Il2cpp.Objects
    const childrenArray = Il2Cpp.array<Il2Cpp.Object>(api().Widget, children.length);
    children.forEach((c, i) => childrenArray.set(i, c));

    api().widgetUtilsChildren.invoke(rows, childrenArray);
    return rows;
}

/** Wrapper over `Sonolus.UI.Common.Sections.SectionBase.CreateTitle` */
export function buildSectionHeader(text: Il2Cpp.Object): Il2Cpp.Object {
    return api().SectionBase.method<Il2Cpp.Object>("CreateTitle", 1).invoke(text);
}

export interface ToggleFieldOptions {
    title: Il2Cpp.Object;
    description: Il2Cpp.Object;
    value: Il2Cpp.Object;
    defaultValue: boolean;
}

/** Wrapper over `Sonolus.UI.Common.Fields.ToggleField` */
export function buildToggleField(options: ToggleFieldOptions): Il2Cpp.Object {
    const field = api().ToggleField.new();
    field.method<void>("SetTitle", 1).invoke(options.title);
    field.method<void>("SetDescription", 1).invoke(options.description);
    field.method<void>("SetValue", 1).invoke(options.value);
    field.method<void>("SetDefaultValue", 1).invoke(options.defaultValue);
    return field;
}

export interface BtnFieldOptions {
    title: Il2Cpp.Object;
    description: Il2Cpp.Object;
    value?: Il2Cpp.Object;
    buttons: Il2Cpp.Object[];
}

/**
 * Wrapper over `Sonolus.UI.Common.Fields.BtnField`
 * Add 20 left margin to buttons (if not 1 button)
 */
export function buildBtnField(options: BtnFieldOptions): Il2Cpp.Object {
    const field = api().BtnField.new();
    field.method<void>("SetTitle", 1).invoke(options.title);
    field.method<void>("SetDescription", 1).invoke(options.description);
    field.method<void>("SetValue", 1).invoke(options.value ?? wrapString(""));

    const buttonsArray = Il2Cpp.array<Il2Cpp.Object>(api().ImgLblBtn, options.buttons.length);
    options.buttons.forEach((button, index) => {
        // if index === 0 keep button else margin button
        const widget = index === 0 ? button : WidgetUtils.Margin(button, 20, 0, 0, 0);
        buttonsArray.set(index, widget);
    });
    field.method<void>("SetBtns", 1).invoke(buttonsArray);
    return field;
}

export interface ImgLblBtnOptions {
    icon: Il2Cpp.Object;
    title: Il2Cpp.Object;
    onClick: () => void;
}

/** Wrapper over `Sonolus.UI.Common.ImgLblBtn` */
export function buildImgLblBtn(options: ImgLblBtnOptions): Il2Cpp.Object {
    const btn = api().ImgLblBtn.new();
    btn.method<void>("SetIcon", 1).invoke(options.icon);
    btn.method<void>("SetTitle", 1).invoke(options.title);
    btn.method<void>("SetOnClick").overload(api().SystemAction).invoke(makeAction(options.onClick));
    return btn;
}

export interface TxtInputFieldOptions {
    title: Il2Cpp.Object;
    description?: Il2Cpp.Object;
    value: Il2Cpp.Object;
    defaultValue?: Il2Cpp.Object;
    placeholder?: Il2Cpp.Object;
    suffix?: Il2Cpp.Object;
    icon?: Il2Cpp.Object;
    characterLimit?: number;
}

/** Wrapper over `Sonolus.UI.Common.Fields.TxtInputField` */
export function buildTxtInputField(options: TxtInputFieldOptions): Il2Cpp.Object {
    const field = api().TxtInputField.new();

    // TODO shortcuts and other fields
    const emptyArray = Il2Cpp.array<Il2Cpp.String>(api().SystemString, 0);

    field.method<void>("SetTitle", 1).invoke(options.title);
    field.method<void>("SetDescription", 1).invoke(options.description ?? wrapString(""));
    field.method<void>("SetValue", 1).invoke(options.value);
    field.method<void>("SetDefaultValue", 1).invoke(options.defaultValue ?? wrapString(""));
    field.method<void>("SetIcon", 1).invoke(options.icon ?? wrapTexture2D(getAssetTexture2D("Edit")));
    field.method<void>("SetPlaceholder", 1).invoke(options.placeholder ?? wrapString(""));
    field.method<void>("SetSuffix", 1).invoke(options.suffix ?? wrapString(""));
    field.method<void>("SetEnabled", 1).invoke(wrapBool(true));
    field.method<void>("SetShortcuts", 1).invoke(emptyArray);
    field.method<void>("SetCharacterLimit", 1).invoke(options.characterLimit ?? 64);

    return field;
}
