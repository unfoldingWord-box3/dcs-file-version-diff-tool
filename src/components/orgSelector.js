import React, { useState } from "react";
import { useAllOrgs } from "dcs-react-hooks";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Organization() {

  const { state, actions } = useAllOrgs({ lang: "en", page: 1, limit: 5 });
  const { orgs, isLoading } = state;
  const [orgName, setOrgName] = useState("");
  
  const orgNames = orgs?.map((orgs) => orgs.username);
  
  const handleEdit = (event) => {
    const orgValue = event?.target?.value;
    setOrgName(orgValue);
  };

  return (
    <div className="App">
      {isLoading ? (
        "loading..."
        ) : (<Autocomplete
        value={orgName}
        options={orgNames}
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
            label="Organization"
          />
        )}
      />)}
     
    </div>
  );
}
