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
      autoOldUrl,
      autoNewUrl,
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
    onOldUrl(autoOldUrl);
  }, [autoOldUrl]);

  useEffect(() => {
    onNewUrl(autoNewUrl);
  }, [autoNewUrl]);

  return (
    <div className="input-form">
      <div className="url-parts">
        <InputTextbox name="server" value={server} callback={onServer} />
        <InputTextbox name="organization" value={organization} callback={onOrganization} />
        <InputTextbox name="repository" value={repository} callback={onRepository} />
        <InputTextbox name="oldBranch" value={oldBranch} callback={onOldBranch} />
        <InputTextbox name="newBranch" value={newBranch} callback={onNewBranch} />
        <InputTextbox name="filepath" value={filepath} callback={onFilepath} />
      </div>
      <div className="urls">
        <InputTextbox name="oldUrl" value={state.oldUrl} callback={onOldUrl} />
        <InputTextbox name="newUrl" value={state.newUrl} callback={onNewUrl} />
      </div>
    </div>
  )
}