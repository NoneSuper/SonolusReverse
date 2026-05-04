import { BaseModule } from "./base-module";

// Modules

import { Logger } from "../logger/logger";

export class ModuleManager {
    public static readonly tag = "ModuleManager";

    // prettier-ignore
    private static modules: BaseModule[] = [
        //
    ];

    /** Initializes all modules by calling init() in module */
    static initAll() {
        Logger.info(`[${this.tag}::initAll] Initializing modules...`);

        this.modules.forEach(module => {
            try {
                module.init();
                module.initHooks();
                Logger.debug(`[${this.tag}::initAll] ${module.tag} module loaded`);
            } catch (error: any) {
                Logger.error(`[${this.tag}::InitAll] Failed to load ${module.tag} module: ${error}`);
            }
        });

        Logger.info(`[${this.tag}::initAll] All modules Initialized`);
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
