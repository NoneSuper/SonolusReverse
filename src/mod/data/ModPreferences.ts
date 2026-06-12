declare const process: {
    env: {
        BUILD_ENV: string;
        BUILD_COMMIT: string;
        BUILD_VERSION: string;
    };
};

export class ModPreferences {
    // read by webpack
    static readonly MAJOR = 0;
    static readonly MINOR = 9;

    static readonly ENV = process.env.BUILD_ENV;
    static readonly COMMIT = process.env.BUILD_COMMIT;
    static readonly VERSION = process.env.BUILD_VERSION;
    static readonly FOR_GAME_VERSION = "1.1.2"; // should be hardcoded, script supports written for THIS version
}
