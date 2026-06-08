import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Title } from "../../sonolus/ui/Title";
import { App } from "../../sonolus/wrappers/App";
import { Dep } from "../../sonolus/wrappers/reactivity/Dep";

export class TitleLabel {
    static init(): void {
        const Lbl = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Lbl");

        // Sonolus.UI.Common.Lbl Title(Sonolus.Reactivity.Dep<string> title);
        const LblTitle = Lbl.method<Il2Cpp.Object>("Title", 1);

        // @ts-ignore
        LblTitle.implementation = this.lblTitleHook;
    }

    private static lblTitleHook(this: Il2Cpp.Object, title: Il2Cpp.Object): Il2Cpp.Object {
        if (Title.inTitleSetup) {
            Object.setPrototypeOf(title, Dep.prototype);
            const value: Il2Cpp.String = (title as Dep<Il2Cpp.String>).value;

            if (!value.isNull() && value.content === App.version) {
                // or we can re-use value.content
                const newTitle: Dep<Il2Cpp.String> = Dep.opImplicit(`Reverse | ${App.version}`);
                return this.method<Il2Cpp.Object>("Title", 1).invoke(newTitle);
            }
        }

        return this.method<Il2Cpp.Object>("Title", 1).invoke(title);
    }
}
