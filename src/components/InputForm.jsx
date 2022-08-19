import { useEffect } from "react";
import useInputFields from "../hooks/useInputFields";
import InputTextbox from "./InputTextbox";

export default function InputForm({
  state,
  actions: { onOldUrl, onNewUrl },
}) {
  const {
    state: {
      server,
      organization,
      repository,
      oldBranch,
      newBranch,
      filepath,
      oldUrl,
      newUrl
    },
    actions: {
      onServer,
      onOrganization,
      onRepository,
      onOldBranch,
      onNewBranch,
      onFilepath,
    }
  } = useInputFields({
    server: "https://git.door43.org",
    organization: "unfoldingword",
    repository: "en_ust",
    oldBranch: "master",
    newBranch: "master",
    filepath: "README.md",
  });

  useEffect(() => {
    onOldUrl(oldUrl);
  }, [oldUrl]);

  useEffect(() => {
    onNewUrl(newUrl);
  }, [newUrl]);

  const oldUrlHandler = (event) => {
    const _oldUrl = event.target.value;
    onOldUrl(_oldUrl);
  };

  const newUrlHandler = (event) => {
    const _newUrl = event.target.value;
    onNewUrl(_newUrl);
  };

  return (
    <div>
      <div>
        <div className="input-form">
          <InputTextbox name="server" value={server} callback={onServer} />
          <InputTextbox name="organization" value={organization} callback={onOrganization} />
          <InputTextbox name="repository" value={repository} callback={onRepository} />
          <InputTextbox name="oldBranch" value={oldBranch} callback={onOldBranch} />
          <InputTextbox name="newBranch" value={newBranch} callback={onNewBranch} />
          <InputTextbox name="filepath" value={filepath} callback={onFilepath} />
        </div>
      </div>
      <div className="url">
        <label for="url">oldUrl:</label>
        <input type="text" onBlur={oldUrlHandler} defaultValue={state.oldUrl} />
      </div>
      <div className="url">
        <label for="url">newUrl:</label>
        <input type="text" onBlur={newUrlHandler} defaultValue={state.newUrl} />
      </div>
    </div>
  )
}