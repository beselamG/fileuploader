import React, { useContext, useEffect, useState } from "react";
import { getBlobs, getBlobsWithVersions } from "../services/blobService";
import { UserRoleContext } from "../context/UserRoleContext";
import { BlobCard } from "./BlobCard";
import { BlobListUpdaterContext } from "../context/BlobListUpdater";

//list and display all the blobs
const BlobList = () => {
 
  const [blobs, setBlobs] = useState([]);
  const [roles] = useContext(UserRoleContext);
  const [updateList] = useContext(BlobListUpdaterContext);

  const getBlobForWritter = async () => {
    const response = await getBlobsWithVersions();
    if (response?.data !== undefined) {
      console.log("hereee");
      setBlobs(response.data);
    }
  };

  const getBlobForReader = async () => {
    const response = await getBlobs();
    if (response?.data !== undefined) {
      console.log("hereee");
      setBlobs(response.data);
    }
  };

  const getBlobList = async () => {
    if (roles.includes("app.writer")) {
      getBlobForWritter();
    }
    if (roles.includes("app.reader") && !roles.includes("app.writer")) {
      getBlobForReader();
    }
  };

  useEffect(() => {
    getBlobList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles,updateList]);

  return (
    <div className="blobMain">
   { blobs.length > 0 &&  <div className="blobCardHeader">
        <p>BLOB NAME</p>
        <p>FOLDER NAME</p>
        <p>VERSION</p>
      </div>}

      {blobs.length > 0 ? 
        blobs.map((item, index) => (
          <BlobCard
            key={index}
            blobName={item.blobName}
            containerName={item.containerName}
            version={roles.includes("app.writer") ? item?.versionId : ""}
          />
        )) : <p>No File</p>}
    </div>
  );
};

export default BlobList;
