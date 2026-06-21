type Props = {
	content: string;
	fileName: string | null;
	onChange: (value: string) => void;
	onNew: () => void;
	onOpen: () => void;
	onSave: () => void;
};

const Editor = ({
	content,
	fileName,
	onChange,
	onNew,
	onOpen,
	onSave,
}: Props) => {
	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<header
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px",
					padding: "8px 16px",
					borderBottom: "1px solid #e5e7eb",
					background: "#fff",
				}}
			>
				<span style={{ flex: 1, fontSize: "14px", color: "#6b7280" }}>
					{fileName ?? "untitled.md"}
				</span>
				<button type="button" onClick={onNew}>
					新規
				</button>
				<button type="button" onClick={onOpen}>
					開く
				</button>
				<button type="button" onClick={onSave}>
					保存
				</button>
			</header>
			<textarea
				value={content}
				onChange={(e) => onChange(e.target.value)}
				style={{
					flex: 1,
					resize: "none",
					border: "none",
					outline: "none",
					padding: "24px",
					fontSize: "15px",
					fontFamily: "monospace",
					lineHeight: "1.7",
				}}
				placeholder="ここにMarkdownを入力..."
			/>
		</div>
	);
};

export default Editor;
