import { AssemblyHelper } from "../core/assembly-helper";
import { BaseModule } from "../core/base-module";
import { isSpoofEnabled } from "../data/state";
import { Logger } from "../logger/logger";

/* 
Client-sided spoof for VIP and Themes. 

Why we hook constructor instead of setters / getters? 
set_VipEndAt is 
```
STR X1, [X0,#0x20]
RET
```
and IL2CPP inlines it. 

The constructor (.ctor()) writes all fields directly while initialized and never will be inlined. 
*/

export class UserInfoSpoof extends BaseModule {
    public readonly tag = "UserInfoSpoof";

    private SPOOFED_VIP_DURATION_DAYS = 1337;
    private MS_PER_DAY = 24 * 60 * 60 * 1000;

    // you can get all themes from https://content.sonolus.com/info.json (currently public, no auth needed)
    // You need just 6 digits (themes.x.name, where x is index of theme), without "theme-" prefix.
    // prefix is used only for ServiceUserProfile.avatarType or .bannerType for reference
    // Yes, this hardcoded TODO: unhardcode this
    private SPOOFED_THEMES = [
        "000001", // Retro Future
        "000002", // Under the Sakura Tree
        "000003", // Dream Live
        "000004", // Sunflowers
        "000005", // Blood Moon
        "000006", // Snowfall
        "000007", // Cozy Christmas
        "000008", // Last Stand
        "000009", // Spring Festival
        "000010", // Mission S
        "000011", // Exfiltration
        "100001" // 彗く星（しいたけ杯）- Exclusive theme, not available to buy
    ];

    // Classes
    private ServiceUserInfo!: Il2Cpp.Class;
    private SystemString!: Il2Cpp.Class;

    // Methods
    private ServiceUserInfoCtor!: Il2Cpp.Method;

    public init(): void {
        this.ServiceUserInfo = AssemblyHelper.AssemblyCSharp.class("Sonolus.Core.Service.ServiceUserInfo");
        this.SystemString = Il2Cpp.corlib.class("System.String");

        this.ServiceUserInfoCtor = this.ServiceUserInfo.method(".ctor", 5);
    }

    public override initHooks(): void {
        const module = this;

        //@ts-ignore
        this.ServiceUserInfoCtor.implementation = function (
            Profile: Il2Cpp.Object,
            GemCount: number,
            VipEndAt: number,
            NameChangeCount: number,
            Themes: Il2Cpp.Array<Il2Cpp.String>
        ): void {
            // <--- OnEnter
            Logger.hook(`ServiceUserInfo::.ctor called with args:`, Profile, GemCount, VipEndAt, NameChangeCount, Themes);

            if (!isSpoofEnabled()) {
                this.method(".ctor", 5).invoke(Profile, GemCount, VipEndAt, NameChangeCount, Themes);
                return;
            }

            // Spoof VipEndAt
            const spoofedVipEndAt = Date.now() + module.SPOOFED_VIP_DURATION_DAYS * module.MS_PER_DAY;

            // Spoof Themes. Allocate a new Il2cpp Array with Il2cpp Strings (string[])
            const themesArray = Il2Cpp.array<Il2Cpp.String>(module.SystemString, module.SPOOFED_THEMES.length);
            module.SPOOFED_THEMES.forEach((name, i) => {
                themesArray.set(i, Il2Cpp.string(name));
            });

            // ---> OnLeave: call real method with our changes
            Logger.debug(`[ServiceUserInfo::.ctor] VipEndAt=${spoofedVipEndAt} (+${module.SPOOFED_VIP_DURATION_DAYS}d), Themes=[${module.SPOOFED_THEMES.join(", ")}]`);
            this.method(".ctor", 5).invoke(Profile, GemCount, spoofedVipEndAt, NameChangeCount, themesArray);
        };
    }
}
