import { Logger } from "../logger/logger";
import { Path } from "../utils/native/path";

interface ConfigData {
    spoofEnabled?: boolean;
    versionOverride?: string;
}

export class Config {
    static spoofEnabled: boolean = true;
    static versionOverride: string = "";

    static load(): void {
        const path = Path.getDataPath() + "config.json";
        try {
            Object.assign(this, JSON.parse(File.readAllText(path)) as ConfigData);
        } catch {
            Logger.warn("[Config::load] No config file found, using defaults");
        }
        Logger.info(`[Config::load] Config loaded with ${Object.keys(this).length} values`);
    }

    static save(): void {
        const path = Path.getDataPath() + "config.json";
        try {
            const file = new File(path, "w");
            file.write(this.toJSON());
            file.close();
            Logger.debug(`[Config::save] Config saved`);
        } catch (error) {
            Logger.error(`[Config::save] Failed to save: ${error}`);
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
