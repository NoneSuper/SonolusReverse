import { AssemblyHelper } from "../core/assembly-helper";
import { BaseModule } from "../core/base-module";
import { CUSTOM_THEME } from "../data/state";
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

        const customTheme = this.buildCustomTheme();
        const newThemes = Il2Cpp.array<Il2Cpp.Object>(this.ContentTheme, kept.length + 1);
        kept.forEach((t, i) => newThemes.set(i, t));
        newThemes.set(kept.length, customTheme);

        themesField.value = newThemes;

        Logger.info(
            `[ContentSystem::SetData] applied '${CUSTOM_THEME.name}' (kept ${kept.length}, dropped ${droppedCount} stale '${CUSTOM_THEME_NAME_PREFIX}*', total ${newThemes.length})`
        );
    }

    /** Allocate a `Sonolus.Core.Content.ContentTheme` with our colors. */
    private buildCustomTheme(): Il2Cpp.Object {
        const c = CUSTOM_THEME.colors;
        const empty = makeSrl("", "");

        const theme = this.ContentTheme.alloc();

        theme.method(".ctor", 26).invoke(
            Il2Cpp.string(CUSTOM_THEME.name),
            Il2Cpp.string(CUSTOM_THEME.title),
            0, // SingleStartAt
            0, // SingleGemPrice
            0, // BundleStartAt
            0, // BundleEndAt
            0, // BundleVipDayCount
            0, // BundleGemPrice
            Il2Cpp.string(c.mainSurface),
            Il2Cpp.string(c.mainBackground),
            Il2Cpp.string(c.mainBackgroundAltFirst),
            Il2Cpp.string(c.mainBackgroundAltSecond),
            Il2Cpp.string(c.mainSuccess),
            Il2Cpp.string(c.mainWarning),
            Il2Cpp.string(c.textNormal),
            Il2Cpp.string(c.textDisabled),
            Il2Cpp.string(c.buttonNormal),
            Il2Cpp.string(c.buttonHighlighted),
            Il2Cpp.string(c.buttonPressed),
            Il2Cpp.string(c.buttonDisabled),
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
