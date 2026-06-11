import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { System } from "../../../../../engine/System";
import { Texture2D } from "../../../../../engine/wrappers/Texture";
import { Dep } from "../../../reactivity/Dep";
import { Ref } from "../../../reactivity/Ref";
import { Field } from "./Field";

// TODO: Enums

/**
 * `Sonolus.UI.Common.Fields.TxtInputField` - text input field (extends Field)
 *
 * @requires Title, Icon, Value, DefaultValue, Placeholder
 */
export class TxtInputField extends Field {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.TxtInputField"));
    }

    static new(): TxtInputField {
        const obj = this._new<TxtInputField>();
        obj.setRequired(["title", "icon", "value", "defaultValue", "placeholder"]);
        return obj;
    }

    value(value: Ref<Il2Cpp.String>): this {
        this.method<void>("SetValue", 1).invoke(value);
        this.setMark("value");
        return this;
    }

    defaultValue(defaultValue: Dep<Il2Cpp.String>): this {
        this.method<void>("SetDefaultValue", 1).invoke(defaultValue);
        this.setMark("defaultValue");
        return this;
    }

    icon(icon: Dep<Texture2D>): this {
        this.method<void>("SetIcon", 1).invoke(icon);
        this.setMark("icon");
        return this;
    }

    placeholder(placeholder: Dep<Il2Cpp.String>): this {
        this.method<void>("SetPlaceholder", 1).invoke(placeholder);
        this.setMark("placeholder");
        return this;
    }

    suffix(suffix: Dep<Il2Cpp.String>): this {
        this.method<void>("SetSuffix", 1).invoke(suffix);
        return this;
    }

    characterLimit(characterLimit: number): this {
        this.method<void>("SetCharacterLimit", 1).invoke(characterLimit);
        return this;
    }

    inputType(inputType: number): this {
        this.method<void>("SetInputType", 1).invoke(inputType);
        return this;
    }

    keyboardType(keyboardType: number): this {
        this.method<void>("SetKeyboardType", 1).invoke(keyboardType);
        return this;
    }

    characterValidation(characterValidation: number): this {
        this.method<void>("SetCharacterValidation", 1).invoke(characterValidation);
        return this;
    }

    shortcuts(shortcuts: string[]): this {
        const shortcutsArray = Il2Cpp.array(System.String, shortcuts.length);
        shortcuts.forEach((value: string, index: number) => shortcutsArray.set(index, Il2Cpp.string(value)));
        this.method<void>("SetShortcuts", 1).invoke(shortcutsArray);
        return this;
    }

    enabled(enabled: Dep<boolean>): this {
        this.method<void>("SetEnabled", 1).invoke(enabled);
        return this;
    }
}
