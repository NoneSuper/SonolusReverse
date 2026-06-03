import { AssemblyHelper } from "../../engine/assembly-helper";
import { Logger } from "../../utils/logger";
import en from "./localization/en.json";
import ru from "./localization/ru.json";

/*
It may look a little complicated. localization is independent from Sonolus one

What we are doing here?

1. Hook `Sonolus.I18n.NotifyUpdate`
    - To detect in-game locale changes and apply them for our translations too

2. Creating `Sonolus.Reactivity.Ref<string>`
    - For live updates (when locale is changed we reload our Refs)

Methods to use:
`I18n.t(key: string)` // plain string
`I18n.tRef(key: string)` // Sonolus Ref<string>

Important!
gameLocale may be null at game startup, so we TEMPORALY falling back to fallbackLocale
we will lazy Initialize it later (in `t` function)
*/

const TRANSLATIONS: Record<string, unknown> = {
    en: en,
    ru: ru
};

/*
export class I18n {
    private static readonly tag = "I18n";

    static supportedLocales: string[] = Object.keys(TRANSLATIONS);
    private static fallbackLocale: string = "en";
    private static currentLocale: string = this.fallbackLocale;
    private static resolved: boolean = false;

    // Cache: key, Ref<string>
    private static localizedRefs: Map<string, Il2Cpp.Object> = new Map();

    private static SettingsUI: Il2Cpp.Class;
    private static SonolusI18n: Il2Cpp.Class;

    private static NotifyUpdate: Il2Cpp.Method;

    public static init(): void {
        this.SettingsUI = AssemblyHelper.AssemblyCSharp.class("Sonolus.Settings.UI");
        this.SonolusI18n = AssemblyHelper.AssemblyCSharp.class("Sonolus.I18n");

        this.NotifyUpdate = this.SonolusI18n.method<void>("NotifyUpdate", 0);

        this.resolveLocale();

        //@ts-ignore
        this.NotifyUpdate.implementation = this.NotifyUpdateHook;
    }

    private static resolveLocale(): void {
        const gameLocale = this.readLocaleFromGame();
        // Logger.debug(`[${this.tag}::resolveLocale] readLocaleFromGame returned: ${gameLocale}`);

        if (gameLocale === null) {
            Logger.debug(`[${this.tag}::resolveLocale] gameLocale is null, falling back to "${this.fallbackLocale}". Will be re-initilizated`);
            this.currentLocale = this.fallbackLocale;
            return;
        }

        this.resolved = true;

        if (gameLocale === this.currentLocale) {
            Logger.debug(`[${this.tag}::resolveLocale] gameLocale === currentLocale, skipping re-initilization with "${this.currentLocale}"`);
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
        } catch (error) {
            Logger.warn(`[${this.tag}::readLocaleFromGame] failed: ${error}`);
            return null;
        }
    }

    private static NotifyUpdateHook(this: Il2Cpp.Object): void {
        Logger.hook("I18n::NotifyUpdate called");
        this.method<void>("NotifyUpdate", 0).invoke();
        I18n.resolveLocale();
        I18n.refreshAllLocalizedRefs();
    }

    private static refreshAllLocalizedRefs(): void {
        for (const [key, ref] of this.localizedRefs) {
            try {
                ref.method<void>("set_Value", 1).invoke(Il2Cpp.string(this.t(key)));
            } catch (e) {
                Logger.warn(`[${this.tag}::refreshAllLocalizedRefs] failed for "${key}": ${e}`);
            }
        }
    }

    /**
     * Create a localized ref for widget builders
     *
     * @returns `Ref<string>`
     */
/*
    public static tRef(key: string, ...args: (string | number)[]): Il2Cpp.Object {
        const existing = this.localizedRefs.get(key);
        if (existing) return existing;

        const ref = allocPinnedStringRef(this.t(key, ...args));
        this.localizedRefs.set(key, ref);
        return ref;
    }

    public static t(key: string, ...args: (string | number)[]): string {
        // Lazy init
        if (!this.resolved) this.resolveLocale();

        const value = this.resolveKey(TRANSLATIONS[this.currentLocale], key);
        if (typeof value !== "string") return `MISSING: ${key}`;

        return this.format(value, ...args);
    }

    /** Replaces {0}, {1} placeholders with provided arguments */
/*
    public static format(text: string, ...args: (string | number)[]): string {
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
}
*/
