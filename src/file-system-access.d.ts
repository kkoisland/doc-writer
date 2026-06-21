interface FileSystemFileHandle {
	readonly name: string;
	getFile(): Promise<File>;
	createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream {
	write(data: string | BufferSource | Blob): Promise<void>;
	close(): Promise<void>;
}

interface OpenFilePickerOptions {
	types?: Array<{
		description?: string;
		accept: Record<string, string[]>;
	}>;
	multiple?: boolean;
}

interface SaveFilePickerOptions {
	suggestedName?: string;
	types?: Array<{
		description?: string;
		accept: Record<string, string[]>;
	}>;
}

interface Window {
	showOpenFilePicker(
		options?: OpenFilePickerOptions,
	): Promise<FileSystemFileHandle[]>;
	showSaveFilePicker(
		options?: SaveFilePickerOptions,
	): Promise<FileSystemFileHandle>;
}
