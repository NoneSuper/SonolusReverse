import { AssemblyHelper } from "../../engine/assembly-helper";

interface Api {
    Assets: Il2Cpp.Class;
}

/** Wrapper over `Sonolus.Assets` class */
export class SonolusAssets {
    private static _api: Api | null = null;

    private static api(): Api {
        if (this._api) return this._api;

        const Assets = AssemblyHelper.AssemblyCSharp.class("Sonolus.Assets");

        this._api = {
            Assets
        };

        return this._api;
    }

    /**
     * Wrapper over `Sonolus.Assets.GetIcon(key)`
     *
     * @returns `UnityEngine.Texture2D`
     * @deprecated Use `getAsset` instead
     */
    static getIcon(iconName: string): Il2Cpp.Object {
        return this.api().Assets.method<Il2Cpp.Object>("GetIcon", 1).invoke(Il2Cpp.string(iconName));
    }

    /**
     * Wrapper over `Sonolus.Assets.get_{assetName}`
     *
     * @returns `UnityEngine.Texture2D` or `UnityEngine.Material` if you searching for Material
     */
    // not returning null if not exist cuz I'm too lazy for check every time for null
    static getAsset(assetName: string): Il2Cpp.Object {
        return this.api().Assets.method<Il2Cpp.Object>(`get_${assetName}`, 0).invoke();
    }
}
