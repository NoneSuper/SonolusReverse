import { api } from "./api";
import { makeAction, wrapString } from "./helpers";

/*
Builders for Sonolus UI widgets

SonolusUI system is amazing
*/

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
export function buildSectionHeader(text: string): Il2Cpp.Object {
    return api().SectionBase.method<Il2Cpp.Object>("CreateTitle", 1).invoke(wrapString(text));
}

export interface ToggleFieldOptions {
    title: string;
    description: string;
    value: Il2Cpp.Object;
    defaultValue: boolean;
}

/** Wrapper over `Sonolus.UI.Common.Fields.ToggleField` */
export function buildToggleField(options: ToggleFieldOptions): Il2Cpp.Object {
    const field = api().ToggleField.new();
    field.method<void>("SetTitle", 1).invoke(wrapString(options.title));
    field.method<void>("SetDescription", 1).invoke(wrapString(options.description));
    field.method<void>("SetValue", 1).invoke(options.value);
    field.method<void>("SetDefaultValue", 1).invoke(options.defaultValue);
    return field;
}

export interface BtnFieldOptions {
    title: string;
    description: string;
    value?: string;
    buttons: Il2Cpp.Object[];
}

/** Wrapper over `Sonolus.UI.Common.Fields.BtnField` */
export function buildBtnField(options: BtnFieldOptions): Il2Cpp.Object {
    const field = api().BtnField.new();
    field.method<void>("SetTitle", 1).invoke(wrapString(options.title));
    field.method<void>("SetDescription", 1).invoke(wrapString(options.description));
    field.method<void>("SetValue", 1).invoke(wrapString(options.value ?? ""));

    const buttonsArray = Il2Cpp.array<Il2Cpp.Object>(api().ImgLblBtn, options.buttons.length);
    options.buttons.forEach((b, i) => buttonsArray.set(i, b));
    field.method<void>("SetBtns", 1).invoke(buttonsArray);
    return field;
}

export interface ImgLblBtnOptions {
    icon: Il2Cpp.Object;
    title: string;
    onClick: () => void;
}

/** Wrapper over `Sonolus.UI.Common.ImgLblBtn` */
export function buildImgLblBtn(options: ImgLblBtnOptions): Il2Cpp.Object {
    const btn = api().ImgLblBtn.new();
    btn.method<void>("SetIcon", 1).invoke(options.icon);
    btn.method<void>("SetTitle", 1).invoke(wrapString(options.title));
    btn.method<void>("SetOnClick").overload(api().SystemAction).invoke(makeAction(options.onClick));
    return btn;
}
