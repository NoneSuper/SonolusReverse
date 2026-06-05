import { AssemblyHelper } from "../../../../../engine/AssemblyHelper";
import { System } from "../../../../../engine/System";
import { Texture2D } from "../../../../../engine/wrappers/Texture";
import { Dep } from "../../../reactivity/Dep";
import { Ref } from "../../../reactivity/Ref";
import { SonolusField } from "./Field";

interface Api {
    TxtInputField: Il2Cpp.Class;
}

export class SonolusTxtInputField extends SonolusField {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const TxtInputField = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Fields.TxtInputField");

        this._api = {
            TxtInputField
        };

        return this._api;
    }

    static new(): SonolusTxtInputField {
        const obj = SonolusTxtInputField._new<SonolusTxtInputField>(this.api().TxtInputField);
        obj.setRequired(["Title", "Icon", "Value", "DefaultValue", "Placeholder"]);
        return obj;
    }

    Value(value: Ref<Il2Cpp.String>): this {
        this.method<SonolusTxtInputField>("SetValue", 1).invoke(value);
        this.setMark("Value");
        return this;
    }

    DefaultValue(defaultValue: Dep<Il2Cpp.String>): this {
        this.method<SonolusTxtInputField>("SetDefaultValue", 1).invoke(defaultValue);
        this.setMark("DefaultValue");
        return this;
    }

    Icon(icon: Dep<Texture2D>): this {
        this.method<SonolusTxtInputField>("SetIcon", 1).invoke(icon);
        this.setMark("Icon");
        return this;
    }

    Placeholder(placeholder: Dep<Il2Cpp.String>): this {
        this.method<SonolusTxtInputField>("SetPlaceholder", 1).invoke(placeholder);
        this.setMark("Placeholder");
        return this;
    }

    Suffix(suffix: Dep<Il2Cpp.String>): this {
        this.method<SonolusTxtInputField>("SetSuffix", 1).invoke(suffix);
        return this;
    }

    CharacterLimit(characterLimit: number): this {
        this.method<SonolusTxtInputField>("SetCharacterLimit", 1).invoke(characterLimit);
        return this;
    }

    InputType(inputType: number): this {
        this.method<SonolusTxtInputField>("SetInputType", 1).invoke(inputType);
        return this;
    }

    KeyboardType(keyboardType: number): this {
        this.method<SonolusTxtInputField>("SetKeyboardType", 1).invoke(keyboardType);
        return this;
    }

    CharacterValidation(characterValidation: number): this {
        this.method<SonolusTxtInputField>("SetCharacterValidation", 1).invoke(characterValidation);
        return this;
    }

    Shortcuts(shortcuts: string[]): this {
        const shortcutsArray = Il2Cpp.array(System.String, shortcuts.length);
        shortcuts.forEach((value: string, index: number) => shortcutsArray.set(index, Il2Cpp.string(value)));
        this.method<SonolusTxtInputField>("SetShortcuts", 1).invoke(shortcutsArray);
        return this;
    }

    Enabled(enabled: Dep<boolean>): this {
        this.method<SonolusTxtInputField>("SetEnabled", 1).invoke(enabled);
        return this;
    }
}
