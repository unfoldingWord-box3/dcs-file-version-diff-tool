import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import React, { useEffect, useState } from "react";
import { useAllOrgs, useOrgRepos } from "dcs-react-hooks";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Repository(orgName) {

  const { state, action } = useOrgRepos({
    orgName: "unfoldingWord",
    page: 1,
    limit: 2
  });

  const { orgRepos, isLoading } = state;
  const [orgRepo, setOrgRepo] = useState("");
  
  const orgRepositories = orgRepos?.map((repo) => repo.name);
  
  const handleEdit = (event) => {
    const orgValue = event?.target?.value;
    setOrgRepo(orgValue);
  };

  return (
    <div className="App">
      {isLoading ? (
        "loading..."
        ) : (<Autocomplete
        value={orgRepo}
        options={orgRepositories}
        freeSolo
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            handleEdit(newValue);
          }
        }}
        handleHomeEndKeys
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={(event) => {
              if (event) {
                handleEdit(event.target.value);
              }
            }}
            label="Repository"
          />
        )}
      />)}
     
    </div>
  );
}
