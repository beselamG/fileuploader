import { useState } from 'react';
import { uploadBlob } from '../services/blobService';



const FileUploader = () =>{
    const [file, setFile] = useState();

      //Handle file selection
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const handleFileSubmit =  async (event) => {
    event.preventDefault();
    const name = file.name
    uploadBlob("class",file)
  }

    return(
        <div>
        <form className="uploadForm" onSubmit={handleFileSubmit} >
          <h2>File Upload</h2>
          <label style={{ paddingBottom: 10 }}>Choose a Conainer</label>
          <input encType="multipart/form-data" name="file" type="file"
            onChange={handleFileChange}
            style={{ marginBottom: 10 }} />
          <button className='formButton' type="submit">Upload</button>
        </form>
      </div>
    )
}
export default FileUploader;