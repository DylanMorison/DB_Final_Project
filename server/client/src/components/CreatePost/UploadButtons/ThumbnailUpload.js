import React from "react";
import ThumbnailUploadIcon from "../../../img/ThumbnailUpload.svg";
import styled from "styled-components";

const Root = styled.div`
  height: 100%;
  width: 100%;
`;

const ThumbnailUpload = () => {
  return (
    <Root>
      <label htmlFor="upload-button">
        <img style={{width: "80px", cursor: "pointer"}} src={ThumbnailUploadIcon} alt="thumnbail upload"  />
      </label>
      <input type="file" id="upload-button" style={{ display: "none" }} />
    </Root>
  );
};

export default ThumbnailUpload;
