import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "use-deep-compare";

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

  return {
    oldUrlHandler,
    newUrlHandler,
    oldUrl: state.oldUrl,
    newUrl: state.newUrl,
    oldFileContent: state.oldFileContent,
    newFileContent: state.newFileContent
  };
}