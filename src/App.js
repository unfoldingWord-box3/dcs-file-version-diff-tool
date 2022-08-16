import { useEffect, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { useDeepCompareEffect } from "use-deep-compare";

import "./styles.css";
// import { text } from "./text";

export default function App() {
  const defaultState = {
    oldUrl: "",
    oldFileContent: "",
    newUrl: "",
    newFileContent: ""
  };
  const [state, setState] = useState(defaultState);

  useDeepCompareEffect(() => {
    fetch(state.oldUrl).then(async (data) => {
      const oldFileContent = await data.text();
      setState((prev) => ({ ...prev, oldFileContent }));
    });
  }, [state.oldUrl]);

  useDeepCompareEffect(() => {
    fetch(state.newUrl).then(async (data) => {
      const newFileContent = await data.text();
      setState((prev) => ({ ...prev, newFileContent }));
    });
  }, [state.newUrl]);

  const oldUrlHandler = (event) => {
    const oldUrl = event.target.value;
    setState({ ...state, oldUrl });
  };

  const newUrlHandler = (event) => {
    const newUrl = event.target.value;
    setState({ ...state, newUrl });
  };

  return (
    <div className="App">
      <h1>ReactDiffViewer</h1>
      <input type="text" onBlur={oldUrlHandler} value={state.oldUrl} />
      <input type="text" onBlur={newUrlHandler} value={state.newUrl} />
      <ReactDiffViewer
        compareMethod={DiffMethod.WORDS_WITH_SPACE}
        oldValue={state.oldFileContent}
        newValue={state.newFileContent}
        hideLineNumbers={false}
      />
    </div>
  );
}
