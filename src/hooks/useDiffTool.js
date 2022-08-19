import { useState, useEffect, useCallback } from "react";

export default function useDiffTool({
  oldUrl = "",
  oldFileContent = "",
  newUrl = "",
  newFileContent = "",
}) {
  const defaultState = {
    oldPending: false,
    oldUrl,
    oldFileContent,
    newPending: false,
    newUrl,
    newFileContent,
  };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    fetch(state.oldUrl).then(async (data) => {
      const oldFileContent = await data.text();
      setState((prev) => ({ ...prev, oldPending: false, oldFileContent }));
    });
  }, [state.oldUrl]);

  useEffect(() => {
    fetch(state.newUrl).then(async (data) => {
      const newFileContent = await data.text();
      setState((prev) => ({ ...prev, newPending: false, newFileContent }));
    });
  }, [state.newUrl]);

  const setOldUrl = useCallback((oldUrl) => {
    setState((prev) => ({ ...prev, oldPending: true, oldUrl, oldFileContent: 'attempting to fetch old file...' }));
  }, []);

  const setNewUrl = useCallback((newUrl) => {
    setState((prev) => ({ ...prev, newPending: true, newUrl, newFileContent: 'attempting to fetch new file...' }));
  }, []);

  return {
    state,
    actions: {
      onOldUrl: setOldUrl,
      onNewUrl: setNewUrl,
    }
  };
};