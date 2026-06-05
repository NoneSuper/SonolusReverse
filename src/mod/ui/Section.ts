import { SonolusAssets } from "../../sonolus/wrappers/Assets";
import { Dep } from "../../sonolus/wrappers/reactivity/Dep";
import { SonolusRouteSection } from "../../sonolus/wrappers/routing/RouteSection";
import { SonolusBtnField } from "../../sonolus/wrappers/ui/common/fields/BtnField";
import { SonolusImgLblBtn } from "../../sonolus/wrappers/ui/common/ImgLblBtn";
import { SonolusRows } from "../../sonolus/wrappers/ui/common/Rows";
import { SonolusBaseSection } from "../../sonolus/wrappers/ui/common/sections/BaseSection";
import { SonolusCustomSection } from "../../sonolus/wrappers/ui/common/sections/CustomSection";
import { Logger } from "../../utils/Logger";
import { I18n } from "../i18n/I18n";

export class CustomSection {
    private static readonly SECTION_ICON_NAME: string = "IconStar";

    private static buildTestField(): SonolusBtnField {
        const btn = SonolusImgLblBtn.new()
            .Title(I18n.tRef("button"))
            .Icon(Dep.opImplicit(SonolusAssets.getAsset("IconStar")))
            .OnClick(() => {
                Logger.debug("Clicked");
            });

        return SonolusBtnField.new().Title(I18n.tRef("hi")).Description(I18n.tRef("desc")).Value(I18n.tRef("")).Btns([btn]);
    }

    static buildCustomSection(): SonolusRouteSection {
        const Title = SonolusBaseSection.CreateTitle(I18n.tRef("ui.title"));

        const rows = SonolusRows.new().Gap(20).Children([Title, CustomSection.buildTestField()]);

        const section = SonolusCustomSection.new().Content(rows);

        const icon = Dep.opImplicit(SonolusAssets.getAsset(this.SECTION_ICON_NAME));
        const route = SonolusRouteSection.new(icon, section);
        return route;
    }
}
