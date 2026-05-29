import { Logger } from "../logger/logger";
import { Path } from "../utils/path";

export interface ThemeData {
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

export class Themes {
    private static _loadedThemes: ThemeData[] = [];

    public static load(): void {
        const path = Path.getDataPath() + "CustomThemes/";
        Path.createDirectory(path);

        const themeFiles = Path.getFiles(path, "*.json");

        const themes: ThemeData[] = [];

        for (const filePath of themeFiles) {
            try {
                Logger.debug(`[Themes::load] Loading custom theme ${filePath.split("/").at(-1)}`);

                const theme = JSON.parse(File.readAllText(filePath)) as ThemeData;
                theme.Id = `sr_custom_${theme.Id}`;
                themes.push(theme);
            } catch (error) {
                Logger.warn(`[Themes::load] Failed to parse custom theme ${filePath}: ${error}`);
            }
        }

        Logger.info(`[Themes::load] Loaded ${themes.length} custom themes`);

        this._loadedThemes = themes;
    }

    public static getLoadedThemes(): ThemeData[] {
        return this._loadedThemes;
    }
}
