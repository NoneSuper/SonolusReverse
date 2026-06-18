import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { System } from "../../../../engine/System";
import { Dep } from "../../reactivity/Dep";
import { ImgLblBtn } from "../common/ImgLblBtn";

/** Wraps a string into `Func<Dep<string>>` delegate for PopupExtensions methods */
function wrapString(text: string): Il2Cpp.Object {
    const funcDepString = System.Func1.inflate(Dep.class.inflate(System.String));
    return Il2Cpp.delegate(funcDepString, () => Dep.opImplicit(text));
}

/** `Sonolus.UI.Popup.PopupExtensions` - static helpers to show popups */
export class PopupExtensions {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Popup.PopupExtensions"));
    }

    /*
    static showTip(router: Il2Cpp.Object, key: string, message: string): void {
        this.class.method("ShowTip", 3).invoke(router, Il2Cpp.string(key), messageFunc(message));
    }
    */

    /*
    // Uhh, with buttons I get access violation idk
    static showInfo(router: Il2Cpp.Object, title: string, message: string, buttons: ImgLblBtn[]): void {
        const btnArray = Il2Cpp.array(ImgLblBtn.class, buttons.length);
        buttons.forEach((btn, index) => btnArray.set(index, btn));

        this.class.method("ShowInfo", 4).invoke(router, wrapString(title), wrapString(message), btnArray);
    }
    */

    static showHelp(router: Il2Cpp.Object, message: string): void {
        this.class.method("ShowHelp", 2).invoke(router, wrapString(message));
    }

    static showError(router: Il2Cpp.Object, message: string, buttons: ImgLblBtn[]): void {
        const btnArray = Il2Cpp.array(ImgLblBtn.class, buttons.length);
        buttons.forEach((btn, index) => btnArray.set(index, btn));

        this.class.method("ShowError", 3).invoke(router, wrapString(message), btnArray);
    }
}
