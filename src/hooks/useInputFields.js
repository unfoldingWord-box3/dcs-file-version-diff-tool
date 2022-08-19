import React, { useMemo, useState } from "react";

export default function useInputFields({
  server: _server,
  organization: _organization,
  repository: _repository,
  oldBranch: _oldBranch,
  newBranch: _newBranch,
  filepath: _filepath,
}) {
  const [server, setServer] = useState(_server);
  const [organization, setOrganization] = useState(_organization);
  const [repository, setRepository] = useState(_repository);
  const [oldBranch, setOldBranch] = useState(_oldBranch);
  const [newBranch, setNewBranch] = useState(_newBranch);
  const [filepath, setFilepath] = useState(_filepath);

  const createUrl = ({ server, organization, repository, branch, filepath }) => {
    let url = '';
    if (server && organization && repository && branch && filepath) {
      // "https://git.door43.org/klappy/en_ult/raw/branch/master/57-TIT.usfm",
      url = `${server}/${organization}/${repository}/raw/branch/${branch}/${filepath}`;
    };
    console.log(url);
    return url;
  };

  // reconstruct url from input form
  const autoOldUrl = useMemo(() => {
    return createUrl({ server, organization, repository, branch: oldBranch, filepath });
  }, [server, organization, repository, oldBranch, filepath]);

  const autoNewUrl = useMemo(() => {
    return createUrl({ server, organization, repository, branch: newBranch, filepath });
  }, [server, organization, repository, newBranch, filepath]);

  return {
    state: {
      server,
      organization,
      repository,
      oldBranch,
      newBranch,
      filepath,
      autoOldUrl,
      autoNewUrl,
    },
    actions: {
      onServer: setServer,
      onOrganization: setOrganization,
      onRepository: setRepository,
      onOldBranch: setOldBranch,
      onNewBranch: setNewBranch,
      onFilepath: setFilepath,
    },
  };
};