import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import useDiffTool from "./hooks/useDiffTool";

import "./styles.css";

export default function App() {
  const {
    oldUrlHandler,
    newUrlHandler,
    oldUrl,
    newUrl,
    oldFileContent,
    newFileContent,
  } = useDiffTool();

  return (
    <div className="App">
      <h1>ReactDiffViewer</h1>
      <div className="url">
        <label for="url">Enter oldUrl:</label>
        <input type="text" onBlur={oldUrlHandler} defaultValue={oldUrl} />
      </div>

      <div className="url">
        <label for="url">Enter newUrl:</label>
        <input type="text" onBlur={newUrlHandler} defaultValue={newUrl} />
      </div>
      <ReactDiffViewer
        compareMethod={DiffMethod.WORDS_WITH_SPACE}
        oldValue={oldFileContent}
        newValue={newFileContent}
        hideLineNumbers={false}
      />
    </div>
  );
}
