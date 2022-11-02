import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { UserRoleContext } from "../context/UserRoleContext";
import { RequestAccessToken } from "../services/mainService";
import BlobList from "./BlobList";
import Container from "./Container";
import FileUploader from "./FileUploader";
import { SignOutButton } from "./SignOutButton";

const AuthenticatedMain = () => {
  const { instance, accounts } = useMsal();
  const [role, setRole] = useState([]);


  const getAccessToken = async () => {
    const req = await RequestAccessToken(instance, accounts);

    if (req?.accessToken !== undefined) {
      const userRoles = instance.getActiveAccount()?.idTokenClaims?.roles;
      setRole(userRoles);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div>
      <UserRoleContext.Provider value={[role, setRole]}>
        <SignOutButton />
        <Container />
        <FileUploader />
        <BlobList />
      </UserRoleContext.Provider>
    </div>
  );
};

export default AuthenticatedMain;
