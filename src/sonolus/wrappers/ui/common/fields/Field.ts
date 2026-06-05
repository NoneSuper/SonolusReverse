import { Dep } from "../../../reactivity/Dep";
import { SonolusCompositeWidget } from "../../CompositeWidget";

export class SonolusField extends SonolusCompositeWidget {
    Title(title: Dep<Il2Cpp.String>): this {
        this.method<this>("SetTitle").invoke(title);
        this.setMark("Title");
        return this;
    }

    Description(description: Dep<Il2Cpp.String>): this {
        this.method<this>("SetDescription").invoke(description);
        return this;
    }

    IsRequired(isRequired: boolean): this {
        this.method<this>("SetIsRequired").invoke(isRequired);
        return this;
    }

    IsStandard(isStandard: boolean): this {
        this.method<this>("SetIsStandard").invoke(isStandard);
        return this;
    }

    IsAdvanced(isAdvanced: boolean): this {
        this.method<this>("SetIsAdvanced").invoke(isAdvanced);
        return this;
    }
    Expanded(expanded: boolean): this {
        this.method<this>("SetExpanded").invoke(expanded);
        return this;
    }
}
