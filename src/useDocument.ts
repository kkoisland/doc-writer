import { useState } from "react";

export type DocumentState = {
	content: string;
	fileHandle: FileSystemFileHandle | null;
};

const useDocument = () => {
	const [content, setContent] = useState("");
	const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
		null,
	);
	const [fileName, setFileName] = useState<string | null>(null);

	const handleNew = () => {
		setContent("");
		setFileHandle(null);
		setFileName(null);
	};

	const handleOpen = async () => {
		try {
			const [handle] = await window.showOpenFilePicker({
				types: [
					{
						description: "Markdown files",
						accept: { "text/markdown": [".md"] },
					},
				],
			});
			const file = await handle.getFile();
			const text = await file.text();
			setContent(text);
			setFileHandle(handle);
			setFileName(handle.name);
		} catch (err) {
			if ((err as Error).name !== "AbortError") {
				console.error("Failed to open file:", err);
			}
		}
	};

	const handleSave = async () => {
		try {
			const handle =
				fileHandle ??
				(await window.showSaveFilePicker({
					suggestedName: "document.md",
					types: [
						{
							description: "Markdown files",
							accept: { "text/markdown": [".md"] },
						},
					],
				}));
			if (!fileHandle) {
				setFileHandle(handle);
				setFileName(handle.name);
			}
			const writable = await handle.createWritable();
			await writable.write(content);
			await writable.close();
		} catch (err) {
			if ((err as Error).name !== "AbortError") {
				console.error("Failed to save file:", err);
			}
		}
	};

	return { content, fileName, setContent, handleNew, handleOpen, handleSave };
};

export default useDocument;
