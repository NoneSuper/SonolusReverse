import { AssemblyHelper } from "../../engine/assembly-helper";
import { SonolusUITitle } from "../../sonolus/ui/title";
import { SonolusApp } from "../../sonolus/wrappers/app";
import { Dep } from "../../sonolus/wrappers/reactivity/dep";

export class TitleLabel {
    static init(): void {
        const Lbl = AssemblyHelper.AssemblyCSharp.class("Sonolus.UI.Common.Lbl");

        // Sonolus.UI.Common.Lbl Title(Sonolus.Reactivity.Dep<string> title);
        const LblTitle = Lbl.method<Il2Cpp.Object>("Title", 1);

        //@ts-ignore
        LblTitle.implementation = this.LblTitleHook;
    }

    private static LblTitleHook(this: Il2Cpp.Object, title: Il2Cpp.Object): Il2Cpp.Object {
        if (SonolusUITitle.inTitleSetup) {
            Object.setPrototypeOf(title, Dep.prototype);
            const value: Il2Cpp.String = (title as Dep<Il2Cpp.String>).value;

            if (!value.isNull() && value.content === SonolusApp.getSonolusVersion()) {
                // or we can re-use value.content
                const newTitle: Dep<Il2Cpp.String> = Dep.opImplicit(`Reverse | ${SonolusApp.getSonolusVersion()}`);
                return this.method<Il2Cpp.Object>("Title", 1).invoke(newTitle);
            }
        }

        return this.method<Il2Cpp.Object>("Title", 1).invoke(title);
    }
}
