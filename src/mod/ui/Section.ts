import { SonolusAssets } from "../../sonolus/wrappers/Assets";
import { Dep } from "../../sonolus/wrappers/reactivity/Dep";
import { SonolusRouteSection } from "../../sonolus/wrappers/routing/RouteSection";
import { SonolusRows } from "../../sonolus/wrappers/ui/common/Rows";
import { SonolusBaseSection } from "../../sonolus/wrappers/ui/common/sections/BaseSection";
import { SonolusCustomSection } from "../../sonolus/wrappers/ui/common/sections/CustomSection";
import { I18n } from "../i18n/I18n";

export class CustomSection {
    private static readonly SECTION_ICON_NAME: string = "IconStar";

    static buildCustomSection(): SonolusRouteSection {
        const Title = SonolusBaseSection.CreateTitle(I18n.tRef("ui.title"));

        const rows = SonolusRows.new().Gap(20).Children([Title]);

        const section = SonolusCustomSection.new().Content(rows);

        const icon = Dep.opImplicit(SonolusAssets.getAsset(this.SECTION_ICON_NAME));
        const route = SonolusRouteSection.new(icon, section);
        return route;
    }
}
