import React, { useState, useEffect } from "react";

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
  const [server, setServer] = useState(_server);
  const [organization, setOrganization] = useState(_organization);
  const [repository, setRepository] = useState(_repository);
  const [oldBranch, setOldBranch] = useState(_oldBranch);
  const [newBranch, setNewBranch] = useState(_newBranch);
  const [filepath, setFilepath] = useState(_filepath);
  const [oldUrl, setOldUrl] = useState(_oldUrl);
  const [oldFileContent, setOldFileContent] = useState(_oldFileContent);
  const [newUrl, setNewUrl] = useState(_newUrl);
  const [newFileContent, setNewFileContent] = useState(_newFileContent);

  // reconstruct oldUrl from input form
  useEffect(() => {
    // "https://git.door43.org/klappy/en_ult/raw/branch/master/57-TIT.usfm",
    if (server && organization && repository && oldBranch && filepath) {
      const __oldUrl = `${server}/${organization}/${repository}/raw/branch/${oldBranch}/${filepath}`;
      setOldUrl(__oldUrl)
    };
  }, [server, organization, repository, oldBranch, filepath]);
  // reconstruct newUrl from input form
  useEffect(() => {
    // "https://git.door43.org/klappy/en_ult/raw/branch/master/57-TIT.usfm",
    if (server && organization && repository && newBranch && filepath) {
      const __newUrl = `${server}/${organization}/${repository}/raw/branch/${newBranch}/${filepath}`;
      setNewUrl(__newUrl)
    };
  }, [server, organization, repository, newBranch, filepath]);

  // fetch oldFileContent
  useEffect(() => {
    if (oldUrl?.length > 10) {
      console.log({ oldUrl });
      fetch(oldUrl).then(async (data) => {
        const __oldFileContent = await data.text();
        setOldFileContent(__oldFileContent);
      });
    };
  }, [oldUrl]);

  // fetch newFileContent
  useEffect(() => {
    if (newUrl?.length > 10) {
      console.log({ newUrl });
      fetch(newUrl).then(async (data) => {
        const __newFileContent = await data.text();
        setNewFileContent(__newFileContent);
      });
    };
  }, [newUrl]);

  return {
    state: {
      server,
      organization,
      repository,
      oldBranch,
      newBranch,
      filepath,
      oldUrl,
      oldFileContent,
      newUrl,
      newFileContent,
    },
    actions: {
      onServer: setServer,
      onOrganization: setOrganization,
      onRepository: setRepository,
      onOldBranch: setOldBranch,
      onNewBranch: setNewBranch,
      onFilepath: setFilepath,
      onOldUrl: setOldUrl,
      onOldFileContent: setOldFileContent,
      onNewUrl: setNewUrl,
      onNewFileContent: setNewFileContent,
    },
  };
};