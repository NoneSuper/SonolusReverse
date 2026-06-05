import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Dep } from "../../../reactivity/Dep";
import { SonolusImgLblBtn } from "../ImgLblBtn";
import { SonolusField } from "./Field";

interface Api {
    BtnField: Il2Cpp.Class;
}

export class SonolusBtnField extends SonolusField {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const BtnField = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.BtnField");

        this._api = {
            BtnField
        };

        return this._api;
    }

    static new(): SonolusBtnField {
        const obj = SonolusBtnField._new<SonolusBtnField>(this.api().BtnField);
        obj.setRequired(["Title", "Value", "Btns"]);
        return obj;
    }

    Value(value: Dep<Il2Cpp.String>): this {
        this.method<SonolusBtnField>("SetValue", 1).invoke(value);
        this.setMark("Value");
        return this;
    }

    Btns(btns: SonolusImgLblBtn[]): this {
        const buttonsArray = Il2Cpp.array<SonolusImgLblBtn>(btns[0].class, btns.length);
        btns.forEach((btn, i) => buttonsArray.set(i, btn));
        this.method<SonolusBtnField>("SetBtns", 1).invoke(buttonsArray);
        this.setMark("Btns");
        return this;
    }
}
