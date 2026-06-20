import { Path } from "../../engine/native/Path";
import { Logger } from "../../utils/Logger";

/* 
redesign loading theme code: DRY
*/

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
    // fileName: string
    private static _loadedThemes: Map<string, CustomThemeData> = new Map();

    static readonly CUSTOM_THEME_NAME_PREFIX = "sr_custom_";

    static load(): void {
        const path = Path.customThemesPath;
        Path.createDirectory(path);

        const themeFiles = Path.getFiles(path, "*.json");

        for (const filePath of themeFiles) {
            try {
                Logger.debug(`[Themes::load] Loading custom theme ${filePath.split("/").at(-1)}`);

                const theme = JSON.parse(File.readAllText(filePath)) as CustomThemeData;
                theme.Id = `sr_custom_${theme.Id}`;

                const fileName = Path.getFileNameFromPath(filePath);
                this._loadedThemes.set(fileName, theme);
            } catch (error) {
                Logger.warn(`[Themes::load] Failed to parse custom theme ${filePath}: ${error}`);
                Path.delete(filePath);
            }
        }

        Logger.info(`[Themes::load] Loaded ${this._loadedThemes.size} custom themes`);
    }

    static get loadedThemes(): Map<string, CustomThemeData> {
        return this._loadedThemes;
    }

    /**
     *
     * @returns 0 if everything good, else 1
     */
    static importTheme(filePath: string): number {
        try {
            const theme = JSON.parse(File.readAllText(filePath)) as CustomThemeData;
            theme.Id = `sr_custom_${theme.Id}`;
            const fileName = Path.getFileNameFromPath(filePath);

            for (const [key, val] of this.loadedThemes) {
                if (val.Id === theme.Id) this.loadedThemes.delete(key);
            }

            this.loadedThemes.set(fileName, theme);
            return 0;
        } catch (error) {
            Logger.warn(`[Themes::importTheme] Failed to import theme ${filePath}: ${error}`);
            Path.delete(filePath);
            return 1;
        }
    }
}
