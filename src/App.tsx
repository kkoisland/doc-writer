import Editor from "./Editor";
import useDocument from "./useDocument";

const App = () => {
	const { content, fileName, setContent, handleNew, handleOpen, handleSave } =
		useDocument();

	return (
		<Editor
			content={content}
			fileName={fileName}
			onChange={setContent}
			onNew={handleNew}
			onOpen={handleOpen}
			onSave={handleSave}
		/>
	);
};

export default App;
