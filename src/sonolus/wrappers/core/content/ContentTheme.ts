import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { SonolusSrl } from "../Srl";

export class SonolusContentTheme extends Il2Cpp.Object {
    protected static _class: Il2Cpp.Class | null = null;

    static get class(): Il2Cpp.Class {
        return (this._class ??= AssemblyHelper.AssemblyCSharp.class("Sonolus.Core.Content.ContentTheme"));
    }

    /** Use `create` instead */
    protected constructor(handle: NativePointer) {
        super(handle);
    }

    static create(
        name: string,
        title: string,
        singleStartAt: number,
        singleGemPrice: number,
        bundleStartAt: number,
        bundleEndAt: number,
        bundleVipDayCount: number,
        bundleGemPrice: number,
        mainSurface: string,
        mainBackground: string,
        mainBackgroundAltFirst: string,
        mainBackgroundAltSecond: string,
        mainSuccess: string,
        mainWarning: string,
        textNormal: string,
        textDisabled: string,
        buttonNormal: string,
        buttonHighlighted: string,
        buttonPressed: string,
        buttonDisabled: string,
        thumbnail: SonolusSrl,
        background: SonolusSrl,
        avatar: SonolusSrl,
        avatarBackground: SonolusSrl,
        banner: SonolusSrl,
        multiplayerBanner: SonolusSrl
    ): SonolusContentTheme {
        const obj = this.class.alloc();
        obj.method<void>(".ctor", 26).invoke(
            Il2Cpp.string(name),
            Il2Cpp.string(title),
            singleStartAt,
            singleGemPrice,
            bundleStartAt,
            bundleEndAt,
            bundleVipDayCount,
            bundleGemPrice,
            Il2Cpp.string(mainSurface),
            Il2Cpp.string(mainBackground),
            Il2Cpp.string(mainBackgroundAltFirst),
            Il2Cpp.string(mainBackgroundAltSecond),
            Il2Cpp.string(mainSuccess),
            Il2Cpp.string(mainWarning),
            Il2Cpp.string(textNormal),
            Il2Cpp.string(textDisabled),
            Il2Cpp.string(buttonNormal),
            Il2Cpp.string(buttonHighlighted),
            Il2Cpp.string(buttonPressed),
            Il2Cpp.string(buttonDisabled),
            thumbnail,
            background,
            avatar,
            avatarBackground,
            banner,
            multiplayerBanner
        );
        return Object.setPrototypeOf(obj, SonolusContentTheme.prototype) as SonolusContentTheme;
    }

    get name(): string {
        return this.method<Il2Cpp.String>("get_Name", 0).invoke().content ?? "";
    }

    get title(): string {
        return this.method<Il2Cpp.String>("get_Title", 0).invoke().content ?? "";
    }

    get singleStartAt(): number {
        return this.method<number>("get_SingleStartAt", 0).invoke();
    }

    get singleGemPrice(): number {
        return this.method<number>("get_SingleGemPrice", 0).invoke();
    }

    get bundleStartAt(): number {
        return this.method<number>("get_BundleStartAt", 0).invoke();
    }

    get bundleEndAt(): number {
        return this.method<number>("get_BundleEndAt", 0).invoke();
    }

    get bundleVipDayCount(): number {
        return this.method<number>("get_BundleVipDayCount", 0).invoke();
    }

    get bundleGemPrice(): number {
        return this.method<number>("get_BundleGemPrice", 0).invoke();
    }

    get mainSurface(): string {
        return this.method<Il2Cpp.String>("get_MainSurface", 0).invoke().content ?? "";
    }

    get mainBackground(): string {
        return this.method<Il2Cpp.String>("get_MainBackground", 0).invoke().content ?? "";
    }

    get mainBackgroundAltFirst(): string {
        return this.method<Il2Cpp.String>("get_MainBackgroundAltFirst", 0).invoke().content ?? "";
    }

    get mainBackgroundAltSecond(): string {
        return this.method<Il2Cpp.String>("get_MainBackgroundAltSecond", 0).invoke().content ?? "";
    }

    get mainSuccess(): string {
        return this.method<Il2Cpp.String>("get_MainSuccess", 0).invoke().content ?? "";
    }

    get mainWarning(): string {
        return this.method<Il2Cpp.String>("get_MainWarning", 0).invoke().content ?? "";
    }

    get textNormal(): string {
        return this.method<Il2Cpp.String>("get_TextNormal", 0).invoke().content ?? "";
    }

    get textDisabled(): string {
        return this.method<Il2Cpp.String>("get_TextDisabled", 0).invoke().content ?? "";
    }

    get buttonNormal(): string {
        return this.method<Il2Cpp.String>("get_ButtonNormal", 0).invoke().content ?? "";
    }

    get buttonHighlighted(): string {
        return this.method<Il2Cpp.String>("get_ButtonHighlighted", 0).invoke().content ?? "";
    }

    get buttonPressed(): string {
        return this.method<Il2Cpp.String>("get_ButtonPressed", 0).invoke().content ?? "";
    }

    get buttonDisabled(): string {
        return this.method<Il2Cpp.String>("get_ButtonDisabled", 0).invoke().content ?? "";
    }

    get thumbnail(): SonolusSrl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_Thumbnail", 0).invoke(), SonolusSrl.prototype);
    }

    get background(): SonolusSrl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_Background", 0).invoke(), SonolusSrl.prototype);
    }

    get avatar(): SonolusSrl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_Avatar", 0).invoke(), SonolusSrl.prototype);
    }

    get avatarBackground(): SonolusSrl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_AvatarBackground", 0).invoke(), SonolusSrl.prototype);
    }

    get banner(): SonolusSrl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_Banner", 0).invoke(), SonolusSrl.prototype);
    }

    get multiplayerBanner(): SonolusSrl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_MultiplayerBanner", 0).invoke(), SonolusSrl.prototype);
    }

    get isSingleAvailable(): boolean {
        return this.method<boolean>("get_IsSingleAvailable", 0).invoke();
    }

    get isBundleAvailable(): boolean {
        return this.method<boolean>("get_IsBundleAvailable", 0).invoke();
    }
}
