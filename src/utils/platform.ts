export class Platform {
    static isPlatformAndroid(): boolean {
        return Process.platform == "linux";
    }

    static isPlatformIOS(): boolean {
        return Process.platform == "darwin";
    }

    static getPlatformString(): string {
        return `${this.isPlatformAndroid() ? "Android" : "iOS"} ${Process.arch.toString()}`;
    }
}
