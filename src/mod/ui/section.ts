import { SonolusAssets } from "../../sonolus/wrappers/assets";
import { Dep } from "../../sonolus/wrappers/reactivity/dep";
import { SonolusRouteSection } from "../../sonolus/wrappers/routing/route-section";
import { SonolusRows } from "../../sonolus/wrappers/ui/common/rows";
import { SonolusBaseSection } from "../../sonolus/wrappers/ui/common/sections/base-section";
import { SonolusCustomSection } from "../../sonolus/wrappers/ui/common/sections/custom-section";
import { I18n } from "../i18n/i18n";

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
