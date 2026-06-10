import { Dep } from "../../../reactivity/Dep";
import { CompositeWidget } from "../../CompositeWidget";

export class Field extends CompositeWidget {
    title(title: Dep<Il2Cpp.String>): this {
        this.method<void>("SetTitle", 1).invoke(title);
        this.setMark("title");
        return this;
    }

    description(description: Dep<Il2Cpp.String>): this {
        this.method<void>("SetDescription", 1).invoke(description);
        return this;
    }

    isRequired(isRequired: boolean): this {
        this.method<void>("SetIsRequired", 1).invoke(isRequired);
        return this;
    }

    isStandard(isStandard: boolean): this {
        this.method<void>("SetIsStandard", 1).invoke(isStandard);
        return this;
    }

    isAdvanced(isAdvanced: boolean): this {
        this.method<void>("SetIsAdvanced", 1).invoke(isAdvanced);
        return this;
    }

    expanded(expanded: boolean): this {
        this.method<void>("SetExpanded", 1).invoke(expanded);
        return this;
    }
}
