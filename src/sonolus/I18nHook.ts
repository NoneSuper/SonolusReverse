import { AssemblyHelper } from "../engine/AssemblyHelper";
import { I18n } from "../mod/i18n/I18n";
import { Logger } from "../utils/Logger";

export class I18nHook {
    static init(): void {
        const I18nClass = AssemblyHelper.AssemblyCSharp.class("Sonolus.I18n");

        I18nClass.method<void>("NotifyUpdate", 0).implementation = function (): void {
            Logger.hook("I18n::NotifyUpdate called");
            this.method<void>("NotifyUpdate", 0).invoke();
            I18n.onLocaleChanged();
        };

        Logger.info("[I18nHook::init] Initialized");
    }
}
