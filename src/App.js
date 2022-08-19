import { useEffect } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import InputForm from "./components/InputForm";
import useDiffTool from "./hooks/useDiffTool";
import useInputFields from "./hooks/useInputFields";

import "./styles.css";

export default function App() {
  const { state, actions } = useDiffTool({
    oldUrl: "",
    oldFileContent: "",
    newUrl: "",
    newFileContent: "",
  });

  return (
    <div className="App">
      <h1>Text File Diff Viewer</h1>
      <InputForm state={state} actions={actions} />
      <ReactDiffViewer
        compareMethod={DiffMethod.WORDS_WITH_SPACE}
        oldValue={state.oldFileContent}
        newValue={state.newFileContent}
        hideLineNumbers={false}
      />
    </div>
  );
}
