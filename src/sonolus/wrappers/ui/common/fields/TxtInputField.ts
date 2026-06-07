import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { System } from "../../../../../engine/System";
import { Texture2D } from "../../../../../engine/wrappers/Texture";
import { Dep } from "../../../reactivity/Dep";
import { Ref } from "../../../reactivity/Ref";
import { Field } from "./Field";

// TODO correct types

export class TxtInputField extends Field {
    protected static override _class: Il2Cpp.Class | null = null;

    static override get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.TxtInputField"));
    }

    static new(): TxtInputField {
        const obj = this._new<TxtInputField>();
        obj.setRequired(["Title", "Icon", "Value", "DefaultValue", "Placeholder"]);
        return obj;
    }

    Value(value: Ref<Il2Cpp.String>): this {
        this.method<void>("SetValue", 1).invoke(value);
        this.setMark("Value");
        return this;
    }

    DefaultValue(defaultValue: Dep<Il2Cpp.String>): this {
        this.method<void>("SetDefaultValue", 1).invoke(defaultValue);
        this.setMark("DefaultValue");
        return this;
    }

    Icon(icon: Dep<Texture2D>): this {
        this.method<void>("SetIcon", 1).invoke(icon);
        this.setMark("Icon");
        return this;
    }

    Placeholder(placeholder: Dep<Il2Cpp.String>): this {
        this.method<void>("SetPlaceholder", 1).invoke(placeholder);
        this.setMark("Placeholder");
        return this;
    }

    Suffix(suffix: Dep<Il2Cpp.String>): this {
        this.method<void>("SetSuffix", 1).invoke(suffix);
        return this;
    }

    CharacterLimit(characterLimit: number): this {
        this.method<void>("SetCharacterLimit", 1).invoke(characterLimit);
        return this;
    }

    InputType(inputType: number): this {
        this.method<void>("SetInputType", 1).invoke(inputType);
        return this;
    }

    KeyboardType(keyboardType: number): this {
        this.method<void>("SetKeyboardType", 1).invoke(keyboardType);
        return this;
    }

    CharacterValidation(characterValidation: number): this {
        this.method<void>("SetCharacterValidation", 1).invoke(characterValidation);
        return this;
    }

    Shortcuts(shortcuts: string[]): this {
        const shortcutsArray = Il2Cpp.array(System.String, shortcuts.length);
        shortcuts.forEach((value: string, index: number) => shortcutsArray.set(index, Il2Cpp.string(value)));
        this.method<void>("SetShortcuts", 1).invoke(shortcutsArray);
        return this;
    }

    Enabled(enabled: Dep<boolean>): this {
        this.method<void>("SetEnabled", 1).invoke(enabled);
        return this;
    }
}
