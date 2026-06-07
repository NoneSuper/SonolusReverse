import { Dep } from "../../../reactivity/Dep";
import { CompositeWidget } from "../../CompositeWidget";

export class Field extends CompositeWidget {
    Title(title: Dep<Il2Cpp.String>): this {
        this.method<void>("SetTitle").invoke(title);
        this.setMark("Title");
        return this;
    }

    Description(description: Dep<Il2Cpp.String>): this {
        this.method<void>("SetDescription").invoke(description);
        return this;
    }

    IsRequired(isRequired: boolean): this {
        this.method<void>("SetIsRequired").invoke(isRequired);
        return this;
    }

    IsStandard(isStandard: boolean): this {
        this.method<void>("SetIsStandard").invoke(isStandard);
        return this;
    }

    IsAdvanced(isAdvanced: boolean): this {
        this.method<void>("SetIsAdvanced").invoke(isAdvanced);
        return this;
    }
    Expanded(expanded: boolean): this {
        this.method<void>("SetExpanded").invoke(expanded);
        return this;
    }
}
