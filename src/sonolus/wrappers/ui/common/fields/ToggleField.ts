import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Dep } from "../../../reactivity/Dep";
import { Ref } from "../../../reactivity/Ref";
import { SonolusField } from "./Field";

export class SonolusToggleField extends SonolusField {
    protected static override _class: Il2Cpp.Class | null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.ToggleField"));
    }

    static new(): SonolusToggleField {
        const obj = this._new<SonolusToggleField>();
        obj.setRequired(["Title", "Value"]);
        return obj;
    }

    Value(value: Ref<boolean>): this {
        this.method<void>("SetValue", 1).invoke(value);
        this.setMark("Value");
        return this;
    }

    DefaultValue(defaultValue: boolean): this {
        this.method<void>("SetDefaultValue", 1).invoke(defaultValue);
        return this;
    }

    Enabled(enabled: Dep<boolean>): this {
        this.method<void>("SetEnabled", 1).invoke(enabled);
        return this;
    }
}
