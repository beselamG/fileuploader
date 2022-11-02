import React, { useContext, useEffect, useState } from "react";
import { getBlobs, getBlobsWithVersions } from "../services/blobService";
import Table from "react-bootstrap/Table";
import { UserRoleContext } from "../context/UserRoleContext";

const BlobList = () => {
  // const [roles, setRoles] = useState([]);
  const [blobs, setBlobs] = useState([]);
  const [roles] = useContext(UserRoleContext);
  const getBlobForWritter =async () => {
    const response = await getBlobsWithVersions();
    if (response?.data !== undefined) {
        console.log('hereee');
        setBlobs(response.data);
    }
  }

  const getBlobForReader =async () => {
    const response =  await getBlobs();
    if (response?.data !== undefined) {
        console.log('hereee');
        setBlobs(response.data);
    }
  }

  const getBlobList = async () => {
    if (roles.includes("app.writer")) {
    getBlobForWritter()
    }
    if (roles.includes("app.reader") && !roles.includes("app.writer")) {
     getBlobForReader()
    }
  };

  useEffect(() => {
    getBlobList();
  }, [roles]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Blob Name </th>
            <th>Container Name</th>
            {roles.includes("app.writer") && <th>Version</th>}
          </tr>
        </thead>
        <tbody>
          {blobs.length > 0 &&
            blobs.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.blobName}</td>
                <td>{item.containerName}</td>
                {roles.includes("app.writer") && <td>{item?.versionId}</td>}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlobList;
