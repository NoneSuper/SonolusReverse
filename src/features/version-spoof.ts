import { AssemblyHelper } from "../core/assembly-helper";
import { BaseModule } from "../core/base-module";
import { Config } from "../data/config";
import { Logger } from "../logger/logger";

/*
TODO
*/

export class VersionSpoof extends BaseModule {
    public readonly tag = "VersionSpoof";

    // Classes
    private App!: Il2Cpp.Class;
    private SemVer!: Il2Cpp.Class;
    private UnityApplication!: Il2Cpp.Class;

    // Methods
    private getSemVer!: Il2Cpp.Method<Il2Cpp.Object>;
    private parseOrZeros!: Il2Cpp.Method<Il2Cpp.Object>;
    private getVersion!: Il2Cpp.Method<Il2Cpp.String>;

    // Cache
    private cachedSemVer: { input: string; semVer: Il2Cpp.Object } | null = null;
    private cachedVersionString: { input: string; managed: Il2Cpp.String } | null = null;

    public init(): void {
        const Asm = AssemblyHelper.AssemblyCSharp;
        const Core = AssemblyHelper.CoreModule;

        this.App = Asm.class("Sonolus.App");
        this.SemVer = Asm.class("Sonolus.SemVer");
        this.UnityApplication = Core.class("UnityEngine.Application");

        this.getSemVer = this.App.method<Il2Cpp.Object>("get_SemVer", 0);
        this.parseOrZeros = this.SemVer.method<Il2Cpp.Object>("ParseOrZeros", 1);
        this.getVersion = this.UnityApplication.method<Il2Cpp.String>("get_version", 0);
    }

    public override initHooks(): void {
        const module = this;

        this.getVersion.implementation = function (): Il2Cpp.String {
            const spoofed = Config.versionOverride;
            if (!spoofed) return module.getVersion.invoke();
            return module.resolveSpoofedString(spoofed);
        };

        this.getSemVer.implementation = function (): Il2Cpp.Object {
            const spoofed = Config.versionOverride;
            if (!spoofed) return module.getSemVer.invoke();
            return module.resolveSpoofedSemVer(spoofed);
        };
    }

    private resolveSpoofedString(input: string): Il2Cpp.String {
        if (this.cachedVersionString?.input === input) return this.cachedVersionString.managed;

        const managed = Il2Cpp.string(input);
        managed.object.ref(true);
        if (this.cachedVersionString) {
            this.cachedVersionString.managed.object.ref(false);
        }

        this.cachedVersionString = { input, managed };
        Logger.info(`[${this.tag}] Application.version: ${input}`);
        return managed;
    }

    private resolveSpoofedSemVer(input: string): Il2Cpp.Object {
        if (this.cachedSemVer?.input === input) return this.cachedSemVer.semVer;

        const semVer = this.parseOrZeros.invoke(Il2Cpp.string(input));
        semVer.ref(true);
        if (this.cachedSemVer) this.cachedSemVer.semVer.ref(false);

        this.cachedSemVer = { input, semVer };
        Logger.info(`[${this.tag}] App.SemVer: ${input}`);
        return semVer;
    }
}
