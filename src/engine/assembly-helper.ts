import { Logger } from "../utils/logger";

export class AssemblyHelper {
    private static readonly tag = "AssemblyHelper";

    static AssemblyCSharp: Il2Cpp.Image;
    static CoreModule: Il2Cpp.Image;
    static NativeFilePicker: Il2Cpp.Image;

    static init() {
        this.AssemblyCSharp = Il2Cpp.domain.assembly("Assembly-CSharp").image;
        this.CoreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
        this.NativeFilePicker = Il2Cpp.domain.assembly("NativeFilePicker.Runtime").image;

        Logger.info(`[${this.tag}::init] Initialized`);
    }
}
