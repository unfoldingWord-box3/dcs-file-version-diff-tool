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
    let oldFileContent;
    fetch(state.oldUrl).then(async (data) => {
      if (data?.status === 200) oldFileContent = await data?.text();
      oldFileContent ||= 'failed to download old file.';
      setState((prev) => ({ ...prev, oldPending: false, oldFileContent }));
    }).catch(error => {
      oldFileContent ||= 'failed to connect to server for old file.';
      setState((prev) => ({ ...prev, oldPending: false, oldFileContent }));
    });
  }, [state.oldUrl]);

  useEffect(() => {
    fetch(state.newUrl).then(async (data) => {
      let newFileContent;
      if (data?.status === 200) newFileContent = await data?.text();
      newFileContent ||= 'failed to download new file.';
      setState((prev) => ({ ...prev, newPending: false, newFileContent }));
    }).catch(error => {
      newFileContent ||= 'failed to connect to server for new file.';
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