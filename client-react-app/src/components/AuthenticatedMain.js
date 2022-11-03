import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { BlobListUpdaterContext } from "../context/BlobListUpdater";
import { UserRoleContext } from "../context/UserRoleContext";
import { RequestAccessToken } from "../services/mainService";
import BlobList from "./BlobList";
import FileUploader from "./FileUploader";
import { NavBar } from "./NabBar";

// logged in user main page
const AuthenticatedMain = () => {
  const { instance, accounts } = useMsal();
  const [role, setRole] = useState([]);
  const [updateList, setUpdateList] = useState(1);
  const [userName, setUserName] = useState(null);

  const getAccessToken = async () => {
    const req = await RequestAccessToken(instance, accounts);

    if (req?.accessToken !== undefined) {
      const userRoles = instance.getActiveAccount()?.idTokenClaims?.roles;
      const name = instance.getActiveAccount()?.idTokenClaims?.name;
      setRole(userRoles);
      setUserName(name);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <div className="main">
      <UserRoleContext.Provider value={[role, setRole]}>
        <BlobListUpdaterContext.Provider value={[updateList, setUpdateList]}>
          <NavBar roles={role} userName={userName} />
          {role.includes("app.writer") && <FileUploader />}
          {(role.includes("app.writer") || role.includes("app.reader")) && (
            <BlobList />
          )}
          {!role.includes("app.writer") && !role.includes("app.reader") && (
            <div className="noAccess">
              <h1>No Access</h1>{" "}
            </div>
          )}
        </BlobListUpdaterContext.Provider>
      </UserRoleContext.Provider>
    </div>
  );
};

export default AuthenticatedMain;
