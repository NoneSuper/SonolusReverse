declare const process: {
    env: {
        BUILD_ENV: string;
        BUILD_COMMIT: string;
        BUILD_VERSION: string;
    };
};

// read by webpack
export const MAJOR = 0;
export const MINOR = 3;

export const ModPreferences = {
    ENV: process.env.BUILD_ENV,
    COMMIT: process.env.BUILD_COMMIT,
    VERSION: process.env.BUILD_VERSION,
    FOR_GAME_VERSION: "1.1.1" // should be hardcoded for many reasons
} as const;
