import { AssemblyHelper } from "../../engine/AssemblyHelper";
import { Texture2D } from "../../engine/wrappers/Texture";

/** `Sonolus.Assets` - static class for loaded textures/materials */
export class Assets {
    private static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.Assets"));
    }

    static getIcon(iconName: string): Il2Cpp.Object {
        return this.class.method<Il2Cpp.Object>("GetIcon", 1).invoke(Il2Cpp.string(iconName));
    }

    /**
     * Wrapper over `Sonolus.Assets.get_{assetName}`
     *
     * @returns `UnityEngine.Texture2D` or `UnityEngine.Material` if searching for Material
     */
    // not returning null if not exist cuz I'm too lazy for check every time for null
    static getAsset(assetName: string): Texture2D | Il2Cpp.Object {
        const asset = this.class.method<Il2Cpp.Object>(`get_${assetName}`, 0).invoke();
        if (asset.class === Texture2D.class) {
            Object.setPrototypeOf(asset, Texture2D.prototype);
            return asset as Texture2D;
        }

        return asset;
    }
}
