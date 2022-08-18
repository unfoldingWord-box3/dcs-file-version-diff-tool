import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import InputForm from "./components/InputForm";
import useDiffTool from "./hooks/useAppState";

import "./styles.css";

export default function App() {
  const {
    state,
    actions,
    state: { oldUrl, newUrl, oldFileContent, newFileContent },
    actions: { onOldUrl, onNewUrl },
  } = useDiffTool({
    server: "https://git.door43.org",
    organization: "unfoldingword",
    repository: "en_ust",
    oldBranch: "master",
    newBranch: "master",
    filepath: "README.md",
    oldUrl: "",
    oldFileContent: "",
    newUrl: "",
    newFileContent: "",
  });

  const oldUrlHandler = (event) => {
    const oldUrl = event.target.value;
    onOldUrl(oldUrl);
  };

  const newUrlHandler = (event) => {
    const newUrl = event.target.value;
    onNewUrl(newUrl);
  };

  return (
    <div className="App">
      <h1>Text File Diff Viewer</h1>
      <div>
        <InputForm state={state} actions={actions} />
      </div>
      <div className="url">
        <label for="url">oldUrl:</label>
        <input type="text" onBlur={oldUrlHandler} defaultValue={oldUrl} />
      </div>
      <div className="url">
        <label for="url">newUrl:</label>
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
