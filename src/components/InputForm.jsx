import InputTextbox from "./InputTextbox";

export default function InputForm({
  state: {
    server,
    organization,
    repository,
    oldBranch,
    newBranch,
    filepath,
  },
  actions: {
    onServer,
    onOrganization,
    onRepository,
    onOldBranch,
    onNewBranch,
    onFilepath,
  }
}) {

  return (
    <div className="input-form">
      <InputTextbox name="server" value={server} callback={onServer} />
      <InputTextbox name="organization" value={organization} callback={onOrganization} />
      <InputTextbox name="repository" value={repository} callback={onRepository} />
      <InputTextbox name="oldBranch" value={oldBranch} callback={onOldBranch} />
      <InputTextbox name="newBranch" value={newBranch} callback={onNewBranch} />
      <InputTextbox name="filepath" value={filepath} callback={onFilepath} />
    </div>
  )
}