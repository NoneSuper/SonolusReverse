import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { Dep } from "../../../reactivity/Dep";
import { Ref } from "../../../reactivity/Ref";
import { Field } from "./Field";

/**
 * `Sonolus.UI.Common.Fields.ToggleField` - boolean toggle switch (extends Field)
 *
 * @requires Title, Value
 */
export class ToggleField extends Field {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.ToggleField"));
    }

    static new(): ToggleField {
        const obj = this._new<ToggleField>();
        obj.setRequired(["title", "value"]);
        return obj;
    }

    value(value: Ref<boolean>): this {
        this.method<void>("SetValue", 1).invoke(value);
        this.setMark("value");
        return this;
    }

    defaultValue(defaultValue: boolean): this {
        this.method<void>("SetDefaultValue", 1).invoke(defaultValue);
        return this;
    }

    enabled(enabled: Dep<boolean>): this {
        this.method<void>("SetEnabled", 1).invoke(enabled);
        return this;
    }
}
