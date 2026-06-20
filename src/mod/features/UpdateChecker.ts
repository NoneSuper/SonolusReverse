import { UnityWebRequest } from "../../engine/wrappers/UnityWebRequest";
import { Logger } from "../../utils/Logger";
import { Constants } from "../data/Constants";

interface VersionResponse {
    major: number;
    minor: number;
}

export class UpdateChecker {
    private static _latestVersion: string | null = null;

    static async checkVersion(): Promise<void> {
        try {
            const request = await UnityWebRequest.sendGet(Constants.VERSION_URL);
            const text = request.text;
            const response = JSON.parse(text) as VersionResponse;
            this._latestVersion = `${response.major}.${response.minor}.0`;
            request.dispose();
            Logger.info(`Latest version fetched: ${this._latestVersion}`);
        } catch (e) {
            Logger.error(`[UpdateChecker::checkVersion] Failed: ${e}`);
        }
    }

    static get latestVersion(): string | null {
        return this._latestVersion ?? null;
    }
}
