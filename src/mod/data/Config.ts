import { Path } from "../../engine/native/Path";
import { Ref } from "../../sonolus/wrappers/reactivity/Ref";
import { Logger } from "../../utils/Logger";

interface ConfigData {
    spoofEnabled: boolean;
    versionChecks: boolean;
}

export class Config {
    private static readonly tag = "Config";

    private static _refs = new Map<string, Ref<unknown>>();

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

    static registerOrGet<K extends keyof ConfigData>(key: K, initialValue: ConfigData[K]): Ref<ConfigData[K]> {
        let ref = this._refs.get(key) as Ref<ConfigData[K]> | undefined;
        if (!ref) {
            const r = Ref.create(initialValue) as Ref<ConfigData[K]>; // r is temp ref var. TS moment???
            r.hook(() => {
                (Config as unknown as Record<string, unknown>)[key] = r.value;
                Config.save();
            });
            this._refs.set(key, r);
            ref = r;
        }
        return ref;
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
