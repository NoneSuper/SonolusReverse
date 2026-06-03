import { Logger } from "../../utils/logger";
import { AssemblyHelper } from "../assembly-helper";
import { System } from "../system";
import { Platform } from "../../utils/platform";

/*
 * Wrapper over https://github.com/yasirkula/UnityNativeFilePicker
 * But there's no ConvertExtensionToFileType (why? omg Sonolus)
 */

interface Api {
    NativeFilePicker: Il2Cpp.Class;
    FilePickedCallback: Il2Cpp.Class;
    FilesExportedCallback: Il2Cpp.Class;
}

export class FilePicker {
    private static tag = "FilePicker";

    private static readonly MIME_MAP: Record<string, string> = {
        json: "application/json"
    };

    private static readonly UTI_MAP: Record<string, string> = {
        json: "public.json"
    };

    private static _api: Api;

    private static api(): Api {
        if (this._api) return this._api;

        const NativeFilePicker = AssemblyHelper.NativeFilePicker.class("NativeFilePicker");
        const FilePickedCallback = NativeFilePicker.nested("FilePickedCallback");
        const FilesExportedCallback = NativeFilePicker.nested("FilesExportedCallback");

        this._api = {
            NativeFilePicker,
            FilePickedCallback,
            FilesExportedCallback
        };

        return this._api;
    }

    /**
     * Prompts the user to pick a file from the available document providers
     *
     * Wrapper over `NativeFilePicker.PickFile(FilePickedCallback callback, System.String[] allowedFileTypes)`
     */
    static pickFile(callback: (path: Il2Cpp.String) => void, allowedFileTypes: string[]): void {
        if (this.isFilePickerBusy()) {
            Logger.warn(`[${this.tag}::pickFile] FilePicker is busy`);
            return;
        }

        const delegate = Il2Cpp.delegate(FilePicker.api().FilePickedCallback, callback);

        const typesArray = Il2Cpp.array(System.String, allowedFileTypes.length);
        allowedFileTypes
            .map(extension => FilePicker.getFileTypeFromExtension(extension))
            .forEach((string, index) => typesArray.set(index, Il2Cpp.string(string)));

        FilePicker.api().NativeFilePicker.method<void>("PickFile", 2).invoke(delegate, typesArray);
    }

    /**
     * Prompts the user to export a file to the available document providers
     *
     * Wrapper over `NativeFilePicker.ExportFile(System.String filePath, FilesExportedCallback callback = null)`
     */
    static exportFile(filePath: string, callback?: ((success: boolean) => void) | undefined): void {
        if (this.isFilePickerBusy()) {
            Logger.warn(`[${this.tag}::exportFile] FilePicker is busy`);
            return;
        }

        const method = FilePicker.api().NativeFilePicker.method<void>("ExportFile", 2);

        if (callback) {
            const delegate = Il2Cpp.delegate(FilePicker.api().FilesExportedCallback, callback);
            method.invoke(Il2Cpp.string(filePath), delegate);
        } else {
            method.invoke(Il2Cpp.string(filePath), NULL);
        }
    }

    /**
     * Converts a file extension to its corresponding MIME on Android and UTI on iOS
     * @param extension don't include the period in extension, i.e. use `png` instead of `.png`
     *
     */
    private static getFileTypeFromExtension(extension: string): string {
        if (Platform.isPlatformAndroid()) {
            return this.MIME_MAP[extension] ?? "";
        } else {
            return this.UTI_MAP[extension] ?? "";
        }
    }

    /**
     * if `true` another PickFile, PickMultipleFiles, ExportFile or ExportMultipleFiles request will simply be ignored
     *
     * @returns `true` if the user is currently importing/exporting files
     */
    private static isFilePickerBusy(): boolean {
        return FilePicker.api().NativeFilePicker.method<boolean>("IsFilePickerBusy", 0).invoke();
    }
}
