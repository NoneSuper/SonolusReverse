import { Logger } from "../logger/logger";

import en from "./localization/en.json";

const TRANSLATIONS: Record<string, any> = {
    en: en
};

export class I18n {
    private static readonly tag = "I18n";

    static supportedLocales: string[] = Object.keys(TRANSLATIONS);
    private static currentLocale: string = "en";

    static init(): void {
        const gameLocale = this.readLocaleFromGame();
        if (this.isLocaleSupported(gameLocale)) {
            this.currentLocale = gameLocale;
        } else {
            Logger.warn(`[${this.tag}::init] Game locale ${gameLocale} is not supported, falling back to en`);
            this.currentLocale = "en";
        }
        Logger.info(`[${this.tag}::init] Initialized with ${this.currentLocale} locale`);
    }

    private static isLocaleSupported(locale: string): boolean {
        return this.supportedLocales.includes(locale);
    }

    private static resolveKey(obj: any, path: string): string | undefined {
        return path.split(".").reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, obj);
    }

    /** Replaces {0}, {1} placeholders with provided arguments */
    public static format(text: string, ...args: (string | number)[]): string {
        if (args.length === 0) return text;

        return text.replace(/{(\d+)}/g, (match, number) => {
            const index = parseInt(number);
            return args[index] !== undefined ? String(args[index]) : match;
        });
    }

    static t(key: string, ...args: (string | number)[]): string {
        const value = this.resolveKey(TRANSLATIONS[this.currentLocale], key);

        if (!value) return `MISSING: ${key}`;

        return this.format(value, ...args);
    }

    static getLocalisedLanguages(): string[] {
        return this.supportedLocales.map(locale => {
            return this.t(`languages.${locale}`);
        });
    }

    static changeLocale(newLocale: string): void {
        if (!this.isLocaleSupported(newLocale)) {
            Logger.warn(`[${this.tag}::changeLocale] Trying to apply unsupported locale ${newLocale}`);
            return;
        }

        this.currentLocale = newLocale;
        Logger.info(`[${this.tag}::changeLocale] Locale changed to: ${newLocale}`);
    }

    // TODO: resolve from Sonolus current UI locale
    // Also add hocks for changed locales
    private static readLocaleFromGame(): string {
        return "en";
    }
}
