import { Path } from "../../engine/native/Path";
import { Logger } from "../../utils/Logger";

interface ConfigData {
    spoofEnabled?: boolean;
    versionChecks?: boolean;
}

export class Config {
    private static readonly tag = "Config";

    static spoofEnabled: boolean = true;
    static versionChecks: boolean = false;

    static load(): void {
        const path = Path.getConfigFilePath();
        try {
            Object.assign(this.fields, JSON.parse(File.readAllText(path)) as ConfigData);
        } catch {
            Logger.warn(`[${this.tag}::load] No config file found, using defaults`);
        }
        Logger.info(`[${this.tag}::load] Config loaded with ${Object.keys(this.fields).length} values`);
    }

    static save(): void {
        const path = Path.getConfigFilePath();
        try {
            const file = new File(path, "w");
            file.write(this.toJSON());
            file.close();
            Logger.debug(`[${this.tag}::save] Config saved`);
        } catch (error) {
            Logger.error(`[${this.tag}::save] Failed to save config: ${error}`);
        }
    }

    private static toJSON(): string {
        const data = this.fields;
        return JSON.stringify(data, null, 4);
    }

    private static get fields(): Record<string, unknown> {
        return {
            spoofEnabled: this.spoofEnabled,
            versionChecks: this.versionChecks
        };
    }
}
