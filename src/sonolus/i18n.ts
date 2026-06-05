import { AssemblyHelper } from "../engine/assembly-helper";
import { I18n } from "../mod/i18n/i18n";
import { Logger } from "../utils/logger";

export class SonolusI18n {
    static init(): void {
        const SonolusI18n = AssemblyHelper.AssemblyCSharp.class("Sonolus.I18n");

        SonolusI18n.method<void>("NotifyUpdate", 0).implementation = function (): void {
            Logger.hook("I18n::NotifyUpdate called");
            this.method<void>("NotifyUpdate", 0).invoke();
            I18n.onLocaleChanged();
        };
    }
}
