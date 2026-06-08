import { Srl } from "../core/Srl";
import { Dep } from "../reactivity/Dep";

export class Theme extends Il2Cpp.Object {
    get title(): Dep<Il2Cpp.String> {
        const dep = this.method<Il2Cpp.Object>("get_Title", 0).invoke();
        return Object.setPrototypeOf(dep, Dep.prototype) as Dep<Il2Cpp.String>;
    }

    get thumbnail(): Srl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_Thumbnail", 0).invoke(), Srl.prototype);
    }

    get background(): Srl {
        return Object.setPrototypeOf(this.method<Il2Cpp.Object>("get_Background", 0).invoke(), Srl.prototype);
    }

    get main(): Il2Cpp.Object {
        return this.method<Il2Cpp.Object>("get_Main", 0).invoke();
    }

    get text(): Il2Cpp.Object {
        return this.method<Il2Cpp.Object>("get_Text", 0).invoke();
    }

    get button(): Il2Cpp.Object {
        return this.method<Il2Cpp.Object>("get_Button", 0).invoke();
    }
}
