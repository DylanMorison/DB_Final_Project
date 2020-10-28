import React from "react";
import Avatar from "../Avatar";
import styled from "styled-components";
import DownloadIcon from "../../img/DownloadIcon.svg"

const AuthorContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-top: 70px;
`;

const AvatarWrapper = styled.div`
  border: 4px solid #198FD2;
  border-radius: 50%;
`;

const AuthorNameWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const AuthorName = styled.div`
  font-family: aktiv-grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 25.888px;
  color: #ffffff;
  padding-bottom: 10px;
`;

const PostType = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #ffffff;
`;

const DownloadIconWrapper = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  padding-left: 15px;
  color: #ffffff;
`;

export const HeroModelCreator = (props) => {
  return (
    <AuthorContent>
      <AvatarWrapper>
        <Avatar image={props.imageInfo} size={72} />
      </AvatarWrapper>
      <AuthorNameWrapper>
        <AuthorName>{props.AuthorName}</AuthorName>
        <PostType>{props.PostType}</PostType>
      </AuthorNameWrapper>
      <DownloadIconWrapper><img src={DownloadIcon} alt="delete icon"/></DownloadIconWrapper>
    </AuthorContent>
  );
};

export default HeroModelCreator;
