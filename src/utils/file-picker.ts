import { AssemblyHelper } from "../core/assembly-helper";
import { Logger } from "../logger/logger";

/* Wrapper over https://github.com/yasirkula/UnityNativeFilePicker
 * But there's no ConvertExtensionToFileType (why? omg Sonolus)
 */

interface Api {
    SystemString: Il2Cpp.Class;
    NativeFilePicker: Il2Cpp.Class;
    FilePickedCallback: Il2Cpp.Class;
    FilesExportedCallback: Il2Cpp.Class;
}

export class FilePicker {
    private static tag = "FilePicker";

    private static _api: Api;

    private static api(): Api {
        if (this._api) return this._api;

        const SystemString = Il2Cpp.corlib.class("System.String");

        const NativeFilePicker = AssemblyHelper.NativeFilePicker.class("NativeFilePicker");
        const FilePickedCallback = NativeFilePicker.nested("FilePickedCallback");
        const FilesExportedCallback = NativeFilePicker.nested("FilesExportedCallback");

        this._api = {
            SystemString,
            NativeFilePicker,
            FilePickedCallback,
            FilesExportedCallback
        };

        return this._api;
    }

    static pickFile(callback: (path: Il2Cpp.String) => void, allowedFileTypes: string[]): void {
        if (this.isFilePickerBusy()) {
            Logger.warn(`[${this.tag}::pickFile] FilePicker is busy`);
            return;
        }

        const delegate = Il2Cpp.delegate(FilePicker.api().FilePickedCallback, callback);
        const typesArray = Il2Cpp.array(FilePicker.api().SystemString, allowedFileTypes.length);
        allowedFileTypes.forEach((string, index) => typesArray.set(index, Il2Cpp.string(string)));

        FilePicker.api().NativeFilePicker.method<void>("PickFile", 2).invoke(delegate, typesArray);
    }

    static exportFile(filePath: string, callback: (success: boolean) => void): void {
        if (this.isFilePickerBusy()) {
            Logger.warn(`[${this.tag}::exportFile] FilePicker is busy`);
            return;
        }

        const delegate = Il2Cpp.delegate(FilePicker.api().FilesExportedCallback, callback);

        FilePicker.api().NativeFilePicker.method<void>("ExportFile", 2).invoke(Il2Cpp.string(filePath), delegate);
    }

    private static isFilePickerBusy(): boolean {
        return FilePicker.api().NativeFilePicker.method<boolean>("IsFilePickerBusy", 0).invoke();
    }
}
