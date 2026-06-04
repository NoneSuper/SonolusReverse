import { Texture2D } from "../../engine/wrappers/texture";
import { SonolusAssets } from "../../sonolus/wrappers/assets";
import { Dep } from "../../sonolus/wrappers/reactivity/dep";
import { SonolusRouteSection } from "../../sonolus/wrappers/routing/route-section";
import { SonolusRows } from "../../sonolus/wrappers/ui/common/rows";
import { SonolusCustomSection } from "../../sonolus/wrappers/ui/common/sections/custom-section";

export class CustomSection {
    static buildCustomSection(): SonolusRouteSection {
        const rows = SonolusRows.new().Gap(20).Children([]);

        const section = SonolusCustomSection.new().Content(rows);

        const icon: Dep<Texture2D> = Dep.opImplicit(SonolusAssets.getAsset("IconStar"));
        const route = SonolusRouteSection.new(icon, section);
        return route;
    }
}
