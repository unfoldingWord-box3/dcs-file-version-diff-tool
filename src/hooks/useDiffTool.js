import { useState, useEffect, useCallback } from "react";

export default function useDiffTool({
  oldUrl = "",
  oldFileContent = "",
  newUrl = "",
  newFileContent = "",
}) {
  const defaultState = {
    oldUrl,
    oldFileContent,
    newUrl,
    newFileContent,
  };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    fetch(state.oldUrl).then(async (data) => {
      const oldFileContent = await data.text();
      setState((prev) => ({ ...prev, oldFileContent }));
    });
  }, [state.oldUrl]);

  useEffect(() => {
    fetch(state.newUrl).then(async (data) => {
      const newFileContent = await data.text();
      setState((prev) => ({ ...prev, newFileContent }));
    });
  }, [state.newUrl]);

  const setOldUrl = useCallback((oldUrl) => {
    setState((prev) => ({ ...prev, oldUrl }));
  }, []);

  const setNewUrl = useCallback((newUrl) => {
    setState((prev) => ({ ...prev, newUrl }));
  }, []);

  return {
    state,
    actions: {
      onOldUrl: setOldUrl,
      onNewUrl: setNewUrl,
    }
  };
};