import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Ref } from "../../sonolus/wrappers/reactivity/Ref";
import { Logger } from "../../utils/Logger";
import en from "./localization/en.json";
import ru from "./localization/ru.json";

const TRANSLATIONS: Record<string, unknown> = {
    en: en,
    ru: ru
};

export class I18n {
    private static readonly tag = "I18n";

    static supportedLocales: string[] = Object.keys(TRANSLATIONS);

    private static fallbackLocale: string = "en";
    private static currentLocale: string = this.fallbackLocale;
    private static resolved: boolean = false;

    // Cache
    private static localizedRefs: Map<string, Ref<Il2Cpp.String>> = new Map();

    private static SettingsUI: Il2Cpp.Class;

    static init(): void {
        this.SettingsUI = AssemblyHelper.AssemblyCSharp.class("Sonolus.Settings.UI");

        this.resolveLocale();
    }

    static onLocaleChanged(): void {
        this.resolveLocale();
        this.refreshAllLocalizedRefs();
    }

    static tRef(key: string, ...args: (string | number)[]): Ref<Il2Cpp.String> {
        const cacheKey = args.length > 0 ? `${key}:${args.join(",")}` : key; // key.X:arg1,arg2
        const existing = this.localizedRefs.get(cacheKey);
        if (existing) return existing;

        return Ref.create(this.t(key, ...args));
    }

    static t(key: string, ...args: (string | number)[]): string {
        if (!this.resolved) this.resolveLocale(); // Lazy init

        const value = this.resolveKey(TRANSLATIONS[this.currentLocale], key);
        if (typeof value !== "string") return `MISSING: ${key}`;

        return this.format(value, ...args);
    }

    /** Replaces {0}, {1} placeholders with provided arguments */
    static format(text: string, ...args: (string | number)[]): string {
        if (args.length === 0) return text;

        return text.replace(/{(\d+)}/g, (match, number) => {
            const index = parseInt(number);
            return args[index] !== undefined ? String(args[index]) : match;
        });
    }

    // Private i18n Helpers
    private static isLocaleSupported(locale: string): boolean {
        return this.supportedLocales.includes(locale);
    }

    private static resolveKey(obj: unknown, path: string): string | undefined {
        const result = path.split(".").reduce<unknown>((prev, curr) => {
            if (prev !== null && typeof prev === "object") return (prev as Record<string, unknown>)[curr];
            return undefined;
        }, obj);
        return typeof result === "string" ? result : undefined;
    }

    private static refreshAllLocalizedRefs(): void {
        this.localizedRefs.forEach((ref: Ref<Il2Cpp.String>, key: string) => {
            ref.value = Il2Cpp.string(this.t(key));
        });
    }

    private static resolveLocale(): void {
        const gameLocale = this.readLocaleFromGame();

        if (gameLocale === null) {
            Logger.debug(`[${this.tag}::resolveLocale] gameLocale is null, falling back to "${this.fallbackLocale}". Will be re-initilizated`);
            this.currentLocale = this.fallbackLocale;
            return;
        }

        this.resolved = true;

        if (gameLocale === this.currentLocale) {
            Logger.debug(`[${this.tag}::resolveLocale] gameLocale == currentLocale, skipping re-initilization with "${this.currentLocale}"`);
            return;
        }

        if (this.isLocaleSupported(gameLocale)) {
            this.currentLocale = gameLocale;
            Logger.info(`[${this.tag}::resolveLocale] Initialized with "${this.currentLocale}" locale`);
        } else {
            Logger.warn(`[${this.tag}::resolveLocale] Game locale "${gameLocale}" not supported, falling back to "${this.fallbackLocale}"`);
            this.currentLocale = this.fallbackLocale;
        }
    }

    // May be unavailable on startup, we are doing lazy initialization in `I18n.t()`
    private static readLocaleFromGame(): string | null {
        try {
            const ref = this.SettingsUI.method<Ref<Il2Cpp.Object>>("get_UILocalization", 0).invoke(); // Ref<Sonolus.Core.Localization.AvailableLocalization>
            if (ref.isNull()) return null;

            Object.setPrototypeOf(ref, Ref.prototype);
            const availableLocalization = (ref as Ref<Il2Cpp.Object>).value;
            if (availableLocalization.isNull()) return null;

            // { Name = "en", Title = "English (English)" } for eng
            const localeName = availableLocalization.method<Il2Cpp.String>("get_Name", 0).invoke();
            return localeName.content || null;
        } catch (error) {
            Logger.error(`[${this.tag}::readLocaleFromGame] failed: ${error}`);
            return null;
        }
    }
}
