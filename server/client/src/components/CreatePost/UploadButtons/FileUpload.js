import React from "react";
import UploadIcon from "../../../img/UploadIcon.svg";
import styled from "styled-components";


const FileUpload = () => {
  return (
    <div>
      <label htmlFor="upload-button">
        <img style={{width: "43px", cursor: "pointer"}} src={UploadIcon} alt="file upload"  />
      </label>
      <input type="file" id="upload-button" style={{ display: "none" }} />
    </div>
  );
};

export default FileUpload;
