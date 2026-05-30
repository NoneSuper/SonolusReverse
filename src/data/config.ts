import { Logger } from "../logger/logger";
import { Path } from "../utils/native/path";

interface ConfigData {
    spoofEnabled?: boolean;
    versionOverride?: string;
}

export class Config {
    private static readonly tag = "Config";

    static spoofEnabled: boolean = true;
    static versionOverride: string = "";

    static load(): void {
        const path = Path.getConfigFilePath();
        try {
            Object.assign(this, JSON.parse(File.readAllText(path)) as ConfigData);
        } catch {
            Logger.warn(`[${this.tag}::load] No config file found, using defaults`);
        }
        Logger.info(`[${this.tag}::load] Config loaded with ${Object.keys(this).length} values`);
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
        const data: Record<string, unknown> = {};
        for (const key of Object.keys(this)) {
            data[key] = (this as unknown as Record<string, unknown>)[key];
        }
        return JSON.stringify(data, null, 4);
    }
}
