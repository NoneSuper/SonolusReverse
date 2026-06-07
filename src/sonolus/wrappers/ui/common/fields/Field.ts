import { Dep } from "../../../reactivity/Dep";
import { CompositeWidget } from "../../CompositeWidget";

export class Field extends CompositeWidget {
    title(title: Dep<Il2Cpp.String>): this {
        this.method<void>("SetTitle").invoke(title);
        this.setMark("title");
        return this;
    }

    description(description: Dep<Il2Cpp.String>): this {
        this.method<void>("SetDescription").invoke(description);
        return this;
    }

    isRequired(isRequired: boolean): this {
        this.method<void>("SetIsRequired").invoke(isRequired);
        return this;
    }

    isStandard(isStandard: boolean): this {
        this.method<void>("SetIsStandard").invoke(isStandard);
        return this;
    }

    isAdvanced(isAdvanced: boolean): this {
        this.method<void>("SetIsAdvanced").invoke(isAdvanced);
        return this;
    }
    expanded(expanded: boolean): this {
        this.method<void>("SetExpanded").invoke(expanded);
        return this;
    }
}
