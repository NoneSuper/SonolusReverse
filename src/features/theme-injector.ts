import { AssemblyHelper } from "../core/assembly-helper";
import { BaseModule } from "../core/base-module";
import { ThemeData, ThemeLoader } from "../data/theme-loader";
import { Logger } from "../logger/logger";
import { makeSrl } from "../utils/helpers";

/*
TODO write header here
*/

export class ThemeInjector extends BaseModule {
    public readonly tag = "ThemeInjector";

    private readonly CUSTOM_THEME_NAME_PREFIX = "sr_custom_";

    // Classes
    private ContentSystem!: Il2Cpp.Class;
    private ContentTheme!: Il2Cpp.Class;

    // Methods
    private SetData!: Il2Cpp.Method;

    public init(): void {
        const Asm = AssemblyHelper.AssemblyCSharp;

        this.ContentSystem = Asm.class("Sonolus.Content.ContentSystem");
        this.ContentTheme = Asm.class("Sonolus.Core.Content.ContentTheme");

        this.SetData = this.ContentSystem.method<void>("SetData", 1);
    }

    public override initHooks(): void {
        const module = this;

        // @ts-ignore
        this.SetData.implementation = function (data: Il2Cpp.Object): void {
            // data is ContentSystem.ContentCache object
            if (!data.isNull()) module.injectCustomTheme(data);

            this.method<void>("SetData", 1).invoke(data);
        };
    }

    // Modified data
    private injectCustomTheme(data: Il2Cpp.Object): void {
        const info = data.field<Il2Cpp.Object>("<Info>k__BackingField").value;
        if (info.isNull()) return;

        const themesField = info.field<Il2Cpp.Array<Il2Cpp.Object>>("<Themes>k__BackingField");
        const oldThemes = themesField.value;

        const keptThemes: Il2Cpp.Object[] = [];

        // Everything is not sr_custom_ we kept, it's original sonolus themes
        for (let i = 0; i < oldThemes.length; i++) {
            const theme = oldThemes.get(i);
            const name = theme.field<Il2Cpp.String>("<Name>k__BackingField").value.content ?? "";
            if (!name.startsWith(this.CUSTOM_THEME_NAME_PREFIX)) {
                keptThemes.push(theme);
            }
        }
        const droppedCount = oldThemes.length - keptThemes.length;

        const customThemes = ThemeLoader.getLoadedThemes();
        const newThemes = Il2Cpp.array<Il2Cpp.Object>(this.ContentTheme, keptThemes.length + customThemes.length);
        keptThemes.forEach((t, i) => newThemes.set(i, t)); // back our kept themes in new Il2cpp Array
        // Add our new custom themes (and build it)
        customThemes.forEach((theme, i) => {
            newThemes.set(keptThemes.length + i, this.buildCustomTheme(theme));
        });

        themesField.value = newThemes;

        Logger.info(
            `[ContentSystem::SetData] kept ${keptThemes.length}, dropped ${droppedCount} stale '${this.CUSTOM_THEME_NAME_PREFIX}*', total ${newThemes.length}`
        );
    }

    /** Allocate a `Sonolus.Core.Content.ContentTheme` with our colors. */
    private buildCustomTheme(ThemeData: ThemeData): Il2Cpp.Object {
        const c = ThemeData.Colors;
        const i = ThemeData.ImagesUrl;
        const empty = makeSrl("", "");

        const theme = this.ContentTheme.alloc();

        theme.method<void>(".ctor", 26).invoke(
            Il2Cpp.string(ThemeData.Id),
            Il2Cpp.string(ThemeData.Title),
            0, // SingleStartAt
            0, // SingleGemPrice
            0, // BundleStartAt
            0, // BundleEndAt
            0, // BundleVipDayCount
            0, // BundleGemPrice
            Il2Cpp.string(c.MainSurface),
            Il2Cpp.string(c.MainBackground),
            Il2Cpp.string(c.MainBackgroundAltFirst),
            Il2Cpp.string(c.MainBackgroundAltSecond),
            Il2Cpp.string(c.MainSuccess),
            Il2Cpp.string(c.MainWarning),
            Il2Cpp.string(c.TextNormal),
            Il2Cpp.string(c.TextDisabled),
            Il2Cpp.string(c.ButtonNormal),
            Il2Cpp.string(c.ButtonHighlighted),
            Il2Cpp.string(c.ButtonPressed),
            Il2Cpp.string(c.ButtonDisabled),
            // If "" "" you won't be able to use theme from Shop (TODO)
            makeSrl("", i.Thumbnail), // Thumbnail
            makeSrl("", i.Background), // Background
            empty, // Avatar
            empty, // AvatarBackground
            empty, // Banner
            empty // MultiplayerBanner
        );
        return theme;
    }
}
