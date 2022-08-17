import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import useDiffTool from "./hooks/useDiffTool";

import "./styles.css";

export default function App() {
  const {
    actions: { setOldUrl, setNewUrl },
    state: { oldUrl, newUrl, oldFileContent, newFileContent },
  } = useDiffTool({
    oldUrl:
      "https://git.door43.org/klappy/en_ult/raw/branch/master/57-TIT.usfm",
    newUrl:
      "https://git.door43.org/klappy/en_ult/raw/branch/57-TIT.usfm/57-TIT.usfm",
  });

  const oldUrlHandler = (event) => {
    const oldUrl = event.target.value;
    setOldUrl(oldUrl);
  };

  const newUrlHandler = (event) => {
    const newUrl = event.target.value;
    setNewUrl(newUrl);
  };

  return (
    <div className="App">
      <h1>Text File Diff Viewer</h1>
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
