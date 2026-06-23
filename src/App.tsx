import Editor from "./Editor";
import useDocument from "./useDocument";
import useWordExport from "./useWordExport";

const App = () => {
	const { content, fileName, setContent, handleNew, handleOpen, handleSave } =
		useDocument();
	const { handleWordExport } = useWordExport();

	return (
		<Editor
			content={content}
			fileName={fileName}
			onChange={setContent}
			onNew={handleNew}
			onOpen={handleOpen}
			onSave={handleSave}
			onWordExport={() => handleWordExport(content, fileName)}
		/>
	);
};

export default App;
