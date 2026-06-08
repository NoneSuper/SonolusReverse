import { ContentSystem } from "../../sonolus/wrappers/content/ContentSystem";
import { ContentTheme } from "../../sonolus/wrappers/core/content/ContentTheme";
import { Srl } from "../../sonolus/wrappers/core/Srl";
import { Logger } from "../../utils/Logger";
import { CustomThemeData, ThemeLoader } from "../data/ThemeLoader";

export class CustomThemes {
    static init(): void {
        // @ts-ignore
        // void SetData(Sonolus.Content.ContentSystem.ContentCache data);
        ContentSystem.class.method<void>("SetData", 1).implementation = this.setDataHook;
    }

    private static setDataHook(this: Il2Cpp.Object, data: Il2Cpp.Object): void {
        Logger.hook("SetData called");
        // Sonolus.Core.Content.ContentInfo
        const info = data.method<Il2Cpp.Object>("get_Info", 0).invoke();
        if (info.isNull()) return this.method<void>("SetData", 1).invoke(data);

        const oldThemes = info.method<Il2Cpp.Array<Il2Cpp.Object>>("get_Themes", 0).invoke();

        const keptThemes: ContentTheme[] = [];

        for (let i = 0; i < oldThemes.length; i++) {
            const theme = Object.setPrototypeOf(oldThemes.get(i), ContentTheme.prototype) as ContentTheme;
            if (!theme.name.startsWith(ThemeLoader.CUSTOM_THEME_NAME_PREFIX)) {
                keptThemes.push(theme);
            }
        }

        const customThemes = ThemeLoader.getLoadedThemes();
        const newThemes = Il2Cpp.array<ContentTheme>(ContentTheme.class, keptThemes.length + customThemes.length);
        keptThemes.forEach((theme, index) => newThemes.set(index, theme));
        customThemes.forEach((theme, index) => newThemes.set(keptThemes.length + index, CustomThemes.buildCustomTheme(theme)));

        info.method<void>("set_Themes", 1).invoke(newThemes);
        this.method<void>("SetData", 1).invoke(data);
    }

    private static buildCustomTheme(themeData: CustomThemeData): ContentTheme {
        const c = themeData.Colors;
        const i = themeData.ImagesUrl;
        const emptySrl = Srl.create("", "");

        // If Thumbnail / Background is ("", ""): you won't be able to use theme from Shop (TODO)
        return ContentTheme.create(
            themeData.Id,
            themeData.Title,
            0, // SingleStartAt
            0, // SingleGemPrice
            0, // BundleStartAt
            0, // BundleEndAt
            0, // BundleVipDayCount
            0, // BundleGemPrice
            c.MainSurface,
            c.MainBackground,
            c.MainBackgroundAltFirst,
            c.MainBackgroundAltSecond,
            c.MainSuccess,
            c.MainWarning,
            c.TextNormal,
            c.TextDisabled,
            c.ButtonNormal,
            c.ButtonHighlighted,
            c.ButtonPressed,
            c.ButtonDisabled,
            Srl.create("", i.Thumbnail),
            Srl.create("", i.Background),
            emptySrl,
            emptySrl,
            emptySrl,
            emptySrl
        );
    }
}
