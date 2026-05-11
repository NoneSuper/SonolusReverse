import { CustomTheme } from "../features/custom-theme";
import { ThemeAction } from "../features/theme-action";
import { TitleLabel } from "../features/title-label";
import { UserInfoSpoof } from "../features/userinfo-spoof";
import { VersionSpoof } from "../features/version-spoof";
import { Logger } from "../logger/logger";
import { BaseModule } from "./base-module";

export class ModuleManager {
    public static readonly tag = "ModuleManager";

    // prettier-ignore
    private static modules: BaseModule[] = [
        new ThemeAction(),
        new UserInfoSpoof(),
        new TitleLabel(),
        new CustomTheme(),
        new VersionSpoof(),
    ];

    /** Initializes all modules by calling init() and initHooks() in module */
    static initAll() {
        Logger.info(`[${this.tag}::initAll] Initializing modules...`);

        this.modules.forEach(module => {
            try {
                module.init();
                module.initHooks();
                Logger.debug(`[${this.tag}::initAll] ${module.tag} module loaded`);
            } catch (error: any) {
                Logger.error(`[${this.tag}::initAll] Failed to load ${module.tag} module: ${error}`);
            }
        });

        Logger.info(`[${this.tag}::initAll] All modules initialized`);
    }

    /**
     * Finds the active instance of a module
     *
     * @param moduleClass The class of the module
     */
    static get<T extends BaseModule>(moduleClass: new (...args: any[]) => T): T | undefined {
        return this.modules.find(module => module instanceof moduleClass) as T | undefined;
    }
}
