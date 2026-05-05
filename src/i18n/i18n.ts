import { AssemblyHelper } from "../core/assembly-helper";
import { Logger } from "../logger/logger";

import en from "./localization/en.json";
import ru from "./localization/ru.json";


/*
It may look a little compilcated
But what we are doing here, it's a hook NotifyUpdate to capture locale changing in-game 
*/

const TRANSLATIONS: Record<string, any> = {
    en: en,
    ru: ru
};

export class I18n {
    private static readonly tag = "I18n";

    static supportedLocales: string[] = Object.keys(TRANSLATIONS);
    private static fallbackLocale: string = "en";
    private static currentLocale: string = this.fallbackLocale;
    private static resolved: boolean = false;

    private static SettingsUI: Il2Cpp.Class;
    private static SonolusI18n: Il2Cpp.Class;

    private static NotifyUpdate: Il2Cpp.Method;

    static init(): void {
        this.SettingsUI = AssemblyHelper.AssemblyCSharp.class("Sonolus.Settings.UI");
        this.SonolusI18n = AssemblyHelper.AssemblyCSharp.class("Sonolus.I18n");

        this.NotifyUpdate = this.SonolusI18n.method<void>("NotifyUpdate", 0);

        this.resolveLocale();

        //@ts-ignore
        this.NotifyUpdate.implementation = this.NotifyUpdateHook;
    }

    private static resolveLocale(): void {
        const gameLocale = this.readLocaleFromGame();
        Logger.debug(`[${this.tag}::resolveLocale] readLocaleFromGame returned: ${gameLocale}`);

        if (gameLocale === null) {
            this.currentLocale = this.fallbackLocale;
            return;
        }

        this.resolved = true;

        if (this.isLocaleSupported(gameLocale)) {
            this.currentLocale = gameLocale;
            Logger.info(`[${this.tag}::resolveLocale] Initialized with "${this.currentLocale}" locale`);
        } else {
            Logger.warn(`[${this.tag}::resolveLocale] Game locale "${gameLocale}" not supported, falling back to "${this.fallbackLocale}"`);
            this.currentLocale = this.fallbackLocale;
        }
    }

    // May be unavailable on startup, we are doing lazy initilization in `I18n.t()`
    private static readLocaleFromGame(): string | null {
        try {
            // Sonolus.Reactivity.Ref<Sonolus.Core.Localization.AvailableLocalization>
            const localizationRef = this.SettingsUI.method<Il2Cpp.Object>("get_UILocalization", 0).invoke();
            if (localizationRef.isNull()) return null;

            // Sonolus.Core.Localization.AvailableLocalization
            const availableLocalization = localizationRef.method<Il2Cpp.Object>("get_Value", 0).invoke();
            if (availableLocalization.isNull()) return null;

            // "en", "ja" ...
            // get_Title will return "English (English)", "日本語 (Japanese)" ...
            const localeName = availableLocalization.method<Il2Cpp.String>("get_Name", 0).invoke();
            return localeName.content || null;
        } catch (error: any) {
            Logger.warn(`[${this.tag}::readLocaleFromGame] failed: ${error}`);
            return null;
        }
    }

    private static NotifyUpdateHook(this: Il2Cpp.Object): void {
        this.method<void>("NotifyUpdate", 0).invoke();
        I18n.resolveLocale();
        Logger.info(`[${I18n.tag}::NotifyUpdate] refreshed locale: ${I18n.currentLocale}`);
    }

    static t(key: string, ...args: (string | number)[]): string {
        // Lazy init
        if (!this.resolved) this.resolveLocale();

        const value = this.resolveKey(TRANSLATIONS[this.currentLocale], key);
        if (typeof value !== "string") return `MISSING: ${key}`;

        return this.format(value, ...args);
    }

    /** Replaces {0}, {1} placeholders with provided arguments */
    public static format(text: string, ...args: (string | number)[]): string {
        if (args.length === 0) return text;

        return text.replace(/{(\d+)}/g, (match, number) => {
            const index = parseInt(number);
            return args[index] !== undefined ? String(args[index]) : match;
        });
    }

    // Private Helpers
    private static isLocaleSupported(locale: string): boolean {
        return this.supportedLocales.includes(locale);
    }

    private static resolveKey(obj: any, path: string): any {
        return path.split(".").reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, obj);
    }
}
