import "frida-il2cpp-bridge";
import { I18n } from "./i18n/i18n";
import { Logger } from "./logger/logger";
import { initSettingsUI } from "./ui/settings";
import { initSpoof } from "./features/spoof";
import { initCaptureTheme } from "./features/theme-action";
import { AssemblyHelper } from "./core/assembly-helper";

function init(): void {
    Logger.info("Script loaded!");

    Il2Cpp.perform(() => {
        Logger.info("Il2cpp loaded!");
        Logger.infoGreen(`SonolusReverse. Game Version ${Il2Cpp.application.version}`);

        // Init Helpers
        AssemblyHelper.init();
        I18n.init(); // Read locale from game, should init after Assemblies

        // Init Functions
        initSpoof();
        initCaptureTheme();

        // Init UI
        initSettingsUI();
    }).catch(error => Logger.error(`Failed to init script: ${error}`));
}

init();
