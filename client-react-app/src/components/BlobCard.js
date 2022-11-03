import { BsFileEarmarkMedical } from "react-icons/bs";

//card for displaying a single blob/file 
export const BlobCard = ({ blobName, containerName, version }) => {
  return (
    <div className="blobCard">
      <div className="blobName">
        <div style={{ padding: 10 }}>
          <BsFileEarmarkMedical />
        </div>

        <p style={{ padding: 10 }}>{blobName}</p>
      </div>
      <p>{containerName}</p>
      {version && <p>{version}</p>}
    </div>
  );
};
