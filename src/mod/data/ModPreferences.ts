declare const process: {
    env: {
        BUILD_ENV: string;
        BUILD_HASH: string;
        BUILD_VERSION: string;
        BUILD_BRANCH: string;
    };
};

export class ModPreferences {
    static readonly ENV = process.env.BUILD_ENV;
    static readonly HASH = process.env.BUILD_HASH;
    static readonly VERSION = process.env.BUILD_VERSION;
    static readonly GIT_BRANCH = process.env.BUILD_BRANCH;
    static readonly FOR_GAME_VERSION = "1.1.2"; // should be hardcoded, script supports written for THIS version
}
