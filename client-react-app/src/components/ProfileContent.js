import React from "react";
import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { RequestAccessToken } from "../services/mainService";

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [localAccountId, setLocalAccountId] = useState(null);

  const name = accounts[0] && accounts[0].name;

const getAccessToken = async () =>{
    const req  = await RequestAccessToken(instance,accounts)
    const accessToken = req.accessToken;
    setAccessToken(accessToken)
    const localAccountId = accounts[0].localAccountId
    setLocalAccountId(localAccountId)
}


  useEffect(() => {
    getAccessToken()
  }, []);



  return (
    <>
      <h5 className="card-title">Welcome {name}</h5>
      {accessToken ? (
        <p>Your roles are: {instance.getActiveAccount().idTokenClaims.roles}</p>
      ) : (
        <p>No Access token</p>
      )}
    </>
  );
};


export default ProfileContent ; 