import { ModPreferences } from "./ModPreferences";

export class Constants {
    static readonly GITHUB_URL = "https://github.com/repinek/SonolusReverse";
    static readonly WIKI_URL = `${this.GITHUB_URL}/wiki`;

    static readonly RAW_URL = this.GITHUB_URL.replace("github.com", "raw.githubusercontent.com");
    static readonly VERSION_URL = `${this.RAW_URL}/${ModPreferences.GIT_BRANCH}/version.json`;
}
