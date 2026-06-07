import { SonolusAssets } from "../../sonolus/wrappers/Assets";
import { Dep } from "../../sonolus/wrappers/reactivity/Dep";
import { SonolusRouteSection } from "../../sonolus/wrappers/routing/RouteSection";
import { SonolusToggleField } from "../../sonolus/wrappers/ui/common/fields/ToggleField";
import { SonolusRows } from "../../sonolus/wrappers/ui/common/Rows";
import { SonolusBaseSection } from "../../sonolus/wrappers/ui/common/sections/BaseSection";
import { SonolusCustomSection } from "../../sonolus/wrappers/ui/common/sections/CustomSection";
import { SonolusWidget } from "../../sonolus/wrappers/ui/Widget";
import { Config } from "../data/Config";
import { I18n } from "../i18n/I18n";

export class CustomSection {
    private static readonly SECTION_ICON_NAME: string = "IconStar";

    static buildCustomSection(): SonolusRouteSection {
        const title = this.title();
        const spoofField = this.spoofField();
        const versionField = this.versionField();

        const rows = SonolusRows.new().Gap(20).Children([title, spoofField, versionField]);

        const section = SonolusCustomSection.new().Content(rows).validate();

        const icon = Dep.opImplicit(SonolusAssets.getAsset(this.SECTION_ICON_NAME));
        const route = SonolusRouteSection.new(icon, section);
        return route;
    }

    private static title(): SonolusWidget {
        return SonolusBaseSection.CreateTitle(I18n.tRef("ui.title"));
    }

    private static spoofField(): SonolusToggleField {
        return SonolusToggleField.new()
            .Title(I18n.tRef("ui.spoof.title"))
            .Description(I18n.tRef("ui.spoof.title"))
            .Enabled(Dep.opImplicit(false))
            .Value(Dep.opImplicit(false))
            .validate();
    }

    private static versionField(): SonolusToggleField {
        const valueRef = Config.registerOrGet("versionCheck", Config.versionCheck);

        return SonolusToggleField.new()
            .Title(I18n.tRef("ui.version_check.title"))
            .Description(I18n.tRef("ui.version_check.description"))
            .Value(valueRef)
            .validate();
    }
}
