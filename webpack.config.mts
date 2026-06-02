import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";
import webpack from "webpack";

interface WebpackEnv {
    dev?: boolean;
    release?: boolean;
    buildCommit?: string;
}

function getCommitHash(): string {
    try {
        return execSync("git rev-parse --short HEAD").toString().trim();
    } catch (error: unknown) {
        console.warn(`Unable to get git commit hash: ${error as Error}, "unknown" will be used instead`);
        return "unknown";
    }
}

function getBaseVersion(): string {
    const prefPath = path.resolve(import.meta.dirname, "src/data/mod-preferences.ts");
    const content = fs.readFileSync(prefPath, "utf-8");

    const major = content.match(/static readonly MAJOR = (\d+)/)?.[1] || "unknown";
    const minor = content.match(/static readonly MINOR = (\d+)/)?.[1] || "unknown";

    return `${major}.${minor}`;
}

function bumpBuildNumber(): number {
    const counterPath = path.resolve(import.meta.dirname, ".build-counter");
    const current = fs.existsSync(counterPath) ? parseInt(fs.readFileSync(counterPath, "utf-8").trim(), 10) || 0 : 0;
    const next = current + 1;
    fs.writeFileSync(counterPath, String(next));
    return next;
}

export default function (env: WebpackEnv): Configuration {
    console.log(""); // indent one line after prettier
    let targetEnv = "release";
    if (env.dev) targetEnv = "dev";

    const isDev = targetEnv === "dev";
    const isRelease = targetEnv === "release";

    const buildCommit = env.buildCommit || getCommitHash();
    const buildVersion = `${getBaseVersion()}.${bumpBuildNumber()}`;

    console.log(`BUILD INFO:\n- Version: ${buildVersion}\n- Environment: ${targetEnv}\n- Commit: ${buildCommit}\n`);

    const ifdef_options = {
        DEV: isDev,
        RELEASE: isRelease,
        version: 3,
        "ifdef-verbose": true,
        "ifdef-triple-slash": true
    };

    const plugins = [];

    plugins.push(
        new webpack.DefinePlugin({
            "process.env.BUILD_ENV": JSON.stringify(targetEnv),
            "process.env.BUILD_COMMIT": JSON.stringify(buildCommit),
            "process.env.BUILD_VERSION": JSON.stringify(buildVersion)
        })
    );

    return {
        mode: isDev ? "development" : "production",
        entry: "./src/index.ts",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: path.resolve(import.meta.dirname, "src"),
                    use: [{ loader: "ts-loader" }, { loader: "ifdef-loader", options: ifdef_options }]
                }
            ]
        },
        resolve: {
            extensions: [".ts"]
        },
        output: {
            filename: "agent.js",
            path: path.resolve(import.meta.dirname, "dist"),
            clean: true
        },
        devtool: "eval-source-map",

        optimization: {
            minimize: isRelease,
            minimizer: isRelease
                ? [
                      new TerserPlugin({
                          terserOptions: {
                              format: {
                                  comments: false
                              },
                              compress: {
                                  dead_code: true
                              }
                          },
                          extractComments: false
                      })
                  ]
                : []
        },
        plugins: plugins,
        stats: "minimal",
        performance: {
            maxAssetSize: 5 * 1024 * 1024,
            maxEntrypointSize: 5 * 1024 * 1024
        }
    };
}
