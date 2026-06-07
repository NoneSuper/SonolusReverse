import { Path } from "../../engine/native/Path";
import { Logger } from "../../utils/Logger";

export interface CustomThemeData {
    Id: string;
    Title: string;
    /** HEX color codes */
    Colors: {
        MainSurface: string;
        MainBackground: string;
        MainBackgroundAltFirst: string;
        MainBackgroundAltSecond: string;

        MainSuccess: string;
        MainWarning: string;

        TextNormal: string;
        TextDisabled: string;

        ButtonNormal: string;
        ButtonHighlighted: string;
        ButtonPressed: string;
        ButtonDisabled: string;
    };
    ImagesUrl: {
        Thumbnail: string;
        Background: string;
    };
}

export class ThemeLoader {
    private static _loadedThemes: CustomThemeData[] = [];

    public static load(): void {
        const path = Path.getCustomThemesPath();
        Path.createDirectory(path);

        const themeFiles = Path.getFiles(path, "*.json");

        const themes: CustomThemeData[] = [];

        for (const filePath of themeFiles) {
            try {
                Logger.debug(`[Themes::load] Loading custom theme ${filePath.split("/").at(-1)}`);

                const theme = JSON.parse(File.readAllText(filePath)) as CustomThemeData;
                theme.Id = `sr_custom_${theme.Id}`;
                themes.push(theme);
            } catch (error) {
                Logger.warn(`[Themes::load] Failed to parse custom theme ${filePath}: ${error}`);
            }
        }

        Logger.info(`[Themes::load] Loaded ${themes.length} custom themes`);

        this._loadedThemes = themes;
    }

    public static getLoadedThemes(): CustomThemeData[] {
        return this._loadedThemes;
    }
}
