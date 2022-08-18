import InputTextbox from "./InputTextbox";

export default function InputForm({
  organization,
  repository,
  branch,
  filepath,
  onOrganization,
  onRepository,
  onBranch,
  onFilepath,
}) {

  return (
    <div>
      <InputTextbox name="organization" value={organization} callback={onOrganization} />
      <InputTextbox name="repository" value={repository} callback={onRepository} />
      <InputTextbox name="branch" value={branch} callback={onBranch} />
      <InputTextbox name="filepath" value={filepath} callback={onFilepath} />
    </div>
  )
}