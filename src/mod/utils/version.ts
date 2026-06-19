import { ModPreferences } from "../data/ModPreferences";

export class Version {
    static get major(): number {
        const major = ModPreferences.VERSION.split(".").at(0);
        return major ? Number(major) : 0;
    }

    static get minor(): number {
        const minor = ModPreferences.VERSION.split(".").at(1);
        return minor ? Number(minor) : 0;
    }

    static get build(): number {
        const build = ModPreferences.VERSION.split(".").at(2);
        return build ? Number(build) : 0;
    }
}
