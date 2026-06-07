import { Assets } from "../../sonolus/wrappers/Assets";
import { Dep } from "../../sonolus/wrappers/reactivity/Dep";
import { RouteSection } from "../../sonolus/wrappers/routing/RouteSection";
import { ToggleField } from "../../sonolus/wrappers/ui/common/fields/ToggleField";
import { Rows } from "../../sonolus/wrappers/ui/common/Rows";
import { CustomSection } from "../../sonolus/wrappers/ui/common/sections/CustomSection";
import { SectionBase } from "../../sonolus/wrappers/ui/common/sections/SectionBase";
import { Widget } from "../../sonolus/wrappers/ui/Widget";
import { Config } from "../data/Config";
import { I18n } from "../i18n/I18n";

export class CustomSectionMod {
    private static readonly SECTION_ICON_NAME: string = "IconStar";

    static buildCustomSection(): RouteSection {
        const title = this.title();
        const spoofField = this.spoofField();
        const versionField = this.versionField();

        const rows = Rows.new().Gap(20).Children([title, spoofField, versionField]);

        const section = CustomSection.new().Content(rows).validate();

        const icon = Dep.opImplicit(Assets.getAsset(this.SECTION_ICON_NAME));
        const route = RouteSection.new(icon, section);
        return route;
    }

    private static title(): Widget {
        return SectionBase.CreateTitle(I18n.tRef("ui.title"));
    }

    private static spoofField(): ToggleField {
        return ToggleField.new()
            .Title(I18n.tRef("ui.spoof.title"))
            .Description(I18n.tRef("ui.spoof.title"))
            .Enabled(Dep.opImplicit(false))
            .Value(Dep.opImplicit(false))
            .validate();
    }

    private static versionField(): ToggleField {
        const valueRef = Config.registerOrGet("versionCheck", Config.versionCheck);

        return ToggleField.new().Title(I18n.tRef("ui.version_check.title")).Description(I18n.tRef("ui.version_check.description")).Value(valueRef).validate();
    }
}
