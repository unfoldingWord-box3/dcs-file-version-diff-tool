import { useState, useEffect, useCallback } from "react";

export default function useAppState({
  server: _server,
  organization: _organization,
  repository: _repository,
  oldBranch: _oldBranch,
  newBranch: _newBranch,
  filepath: _filepath,
  oldUrl: _oldUrl,
  oldFileContent: _oldFileContent,
  newUrl: _newUrl,
  newFileContent: _newFileContent,
}) {
  const defaultState = {
    server: _server,
    organization: _organization,
    repository: _repository,
    oldBranch: _oldBranch,
    newBranch: _newBranch,
    filepath: _filepath,
    oldUrl: _oldUrl,
    oldFileContent: _oldFileContent,
    newUrl: _newUrl,
    newFileContent: _newFileContent,
  };
  const [state, setState] = useState(defaultState);

  const {
    server,
    organization,
    repository,
    oldBranch,
    newBranch,
    filepath,
    oldUrl,
    // oldFileContent,
    newUrl,
    // newFileContent,
  } = state;

  // reconstruct oldUrl from input form
  useEffect(() => {
    // "https://git.door43.org/klappy/en_ult/raw/branch/master/57-TIT.usfm",
    const _oldUrl = `${server}/${organization}/${repository}/raw/branch/${oldBranch}/${filepath}`;
    setState(prev => ({ ...prev, oldUrl: _oldUrl }));
  }, [server, organization, repository, oldBranch, filepath]);
  // reconstruct newUrl from input form
  useEffect(() => {
    // "https://git.door43.org/klappy/en_ult/raw/branch/master/57-TIT.usfm",
    const _newUrl = `${server}/${organization}/${repository}/raw/branch/${newBranch}/${filepath}`;
    setState(prev => ({ ...prev, newUrl: _newUrl }));
  }, [server, organization, repository, newBranch, filepath]);

  // fetch oldFileContent
  useEffect(() => {
    if (oldUrl?.length > 10) {
      console.log({ oldUrl });
      fetch(oldUrl).then(async (data) => {
        const oldFileContent = await data.text();
        setState((prev) => ({ ...prev, oldFileContent }));
      });
    };
  }, [oldUrl]);

  // fetch newFileContent
  useEffect(() => {
    if (newUrl?.length > 10) {
      console.log({ newUrl });
      fetch(newUrl).then(async (data) => {
        const newFileContent = await data.text();
        setState((prev) => ({ ...prev, newFileContent }));
      });
    };
  }, [newUrl]);

  // Actions:
  const onServer = useCallback((server) => {
    setState((prev) => ({ ...prev, server }));
  }, []);

  const onOrganization = useCallback((organization) => {
    setState((prev) => ({ ...prev, organization }));
  }, []);

  const onRepository = useCallback((repository) => {
    setState((prev) => ({ ...prev, repository }));
  }, []);

  const onOldBranch = useCallback((oldBranch) => {
    setState((prev) => ({ ...prev, oldBranch }));
  }, []);

  const onNewBranch = useCallback((newBranch) => {
    setState((prev) => ({ ...prev, newBranch }));
  }, []);

  const onFilepath = useCallback((filepath) => {
    setState((prev) => ({ ...prev, filepath }));
  }, []);

  const onOldUrl = useCallback((oldUrl) => {
    setState((prev) => ({ ...prev, oldUrl }));
  }, []);

  const onNewUrl = useCallback((newUrl) => {
    setState((prev) => ({ ...prev, newUrl }));
  }, []);

  return {
    state,
    actions: {
      onServer,
      onOrganization,
      onRepository,
      onOldBranch,
      onNewBranch,
      onFilepath,
      onOldUrl,
      onNewUrl,
    },
  };
};

useAppState.defaultProps = {
  server: "https://git.door43.org",
  organization: "unfoldingword",
  repository: "en_ult",
  oldBranch: "master",
  newBranch: "master",
  filepath: "README.md",
  oldUrl: "",
  oldFileContent: "",
  newUrl: "",
  newFileContent: "",
};