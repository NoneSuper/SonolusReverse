import { AssemblyHelper } from "../core/assembly-helper";
import { BaseModule } from "../core/base-module";
import { ThemeData, Themes } from "../data/themes";
import { Logger } from "../logger/logger";
import { makeSrl } from "../utils/helpers";

/*
TODO write header here and rewrite some parts 
*/

const CUSTOM_THEME_NAME_PREFIX = "sr_custom_";

export class CustomTheme extends BaseModule {
    public readonly tag = "CustomTheme";

    // Classes
    private ContentSystem!: Il2Cpp.Class;
    private ContentTheme!: Il2Cpp.Class;

    // Methods
    private SetData!: Il2Cpp.Method;

    public init(): void {
        const Asm = AssemblyHelper.AssemblyCSharp;

        this.ContentSystem = Asm.class("Sonolus.Content.ContentSystem");
        this.ContentTheme = Asm.class("Sonolus.Core.Content.ContentTheme");

        this.SetData = this.ContentSystem.method("SetData", 1);
    }

    public override initHooks(): void {
        const module = this;

        // @ts-ignore
        this.SetData.implementation = function (data: Il2Cpp.Object): void {
            try {
                if (!data.isNull()) {
                    module.injectCustomTheme(data);
                }
            } catch (error) {
                Logger.error(`[${module.tag}] inject failed: ${error}`);
            }
            this.method("SetData", 1).invoke(data);
        };
    }

    private injectCustomTheme(data: Il2Cpp.Object): void {
        const info = data.field<Il2Cpp.Object>("<Info>k__BackingField").value;
        if (info.isNull()) return;

        const themesField = info.field<Il2Cpp.Array<Il2Cpp.Object>>("<Themes>k__BackingField");
        const oldThemes = themesField.value;

        // REWRITE: we also removing here our old themes
        const kept: Il2Cpp.Object[] = [];
        let droppedCount = 0;
        for (let i = 0; i < oldThemes.length; i++) {
            const theme = oldThemes.get(i);
            const name = theme.field<Il2Cpp.String>("<Name>k__BackingField").value;
            const nameStr = name.isNull() ? "" : (name.content ?? "");
            if (nameStr.startsWith(CUSTOM_THEME_NAME_PREFIX)) {
                droppedCount++;
            } else {
                kept.push(theme);
            }
        }

        const customThemes = Themes.getLoadedThemes();
        const newThemes = Il2Cpp.array<Il2Cpp.Object>(this.ContentTheme, kept.length + customThemes.length);
        kept.forEach((t, i) => newThemes.set(i, t));
        customThemes.forEach((theme, i) => {
            newThemes.set(kept.length + i, this.buildCustomTheme(theme));
        });

        themesField.value = newThemes;

        Logger.info(`[ContentSystem::SetData] kept ${kept.length}, dropped ${droppedCount} stale '${CUSTOM_THEME_NAME_PREFIX}*', total ${newThemes.length}`);
    }

    /** Allocate a `Sonolus.Core.Content.ContentTheme` with our colors. */
    private buildCustomTheme(ThemeData: ThemeData): Il2Cpp.Object {
        const c = ThemeData.Colors;
        const empty = makeSrl("", "");

        const theme = this.ContentTheme.alloc();

        theme.method(".ctor", 26).invoke(
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
            empty, // Thumbnail
            empty, // Background
            empty, // Avatar
            empty, // AvatarBackground
            empty, // Banner
            empty // MultiplayerBanner
        );
        return theme;
    }
}
