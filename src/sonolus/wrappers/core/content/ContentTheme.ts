import { AssemblyHelper } from "../../../../engine/AssemblyHelper";
import { Srl } from "../Srl";

export class ContentTheme extends Il2Cpp.Object {
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
        thumbnail: Srl,
        background: Srl,
        avatar: Srl,
        avatarBackground: Srl,
        banner: Srl,
        multiplayerBanner: Srl
    ): ContentTheme {
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
        return Object.setPrototypeOf(obj, ContentTheme.prototype) as ContentTheme;
    }

    get name(): string {
        return this.method<Il2Cpp.String>("get_Name", 0).invoke().content ?? "";
    }

    get title(): string {
        return this.method<Il2Cpp.String>("get_Title", 0).invoke().content ?? "";
    }
}
