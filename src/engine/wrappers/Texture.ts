import { AssemblyHelper } from "../AssemblyHelper";

export class Texture extends Il2Cpp.Object {}

export class Texture2D extends Texture {
    static get class(): Il2Cpp.Class {
        return AssemblyHelper.CoreModule.class("UnityEngine.Texture2D");
    }
}
