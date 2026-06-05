import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Dep } from "../../../reactivity/Dep";
import { Ref } from "../../../reactivity/Ref";
import { SonolusField } from "./Field";

interface Api {
    ToggleField: Il2Cpp.Class;
}

export class SonolusToggleField extends SonolusField {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const ToggleField = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.ToggleField");

        this._api = {
            ToggleField
        };

        return this._api;
    }

    static new(): SonolusToggleField {
        const obj = SonolusToggleField._new<SonolusToggleField>(this.api().ToggleField);
        obj.setRequired(["Title", "Value"]);
        return obj;
    }

    Value(value: Ref<boolean>): this {
        this.method<SonolusToggleField>("SetValue", 1).invoke(value);
        this.setMark("Value");
        return this;
    }

    DefaultValue(defaultValue: boolean): this {
        this.method<SonolusToggleField>("SetDefaultValue", 1).invoke(defaultValue);
        return this;
    }

    Enabled(enabled: Dep<boolean>): this {
        this.method<SonolusToggleField>("SetEnabled", 1).invoke(enabled);
        return this;
    }
}
