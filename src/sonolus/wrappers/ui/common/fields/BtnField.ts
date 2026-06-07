import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Dep } from "../../../reactivity/Dep";
import { ImgLblBtn } from "../ImgLblBtn";
import { Field } from "./Field";

export class BtnField extends Field {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.BtnField"));
    }

    static new(): BtnField {
        const obj = this._new<BtnField>();
        obj.setRequired(["Title", "Value", "Btns"]);
        return obj;
    }

    Value(value: Dep<Il2Cpp.String>): this {
        this.method<void>("SetValue", 1).invoke(value);
        this.setMark("Value");
        return this;
    }

    Btns(btns: ImgLblBtn[]): this {
        const buttonsArray = Il2Cpp.array<ImgLblBtn>(btns[0].class, btns.length);
        btns.forEach((btn, i) => buttonsArray.set(i, btn));
        this.method<void>("SetBtns", 1).invoke(buttonsArray);
        this.setMark("Btns");
        return this;
    }
}
