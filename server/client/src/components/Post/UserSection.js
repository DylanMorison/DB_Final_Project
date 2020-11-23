import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";
import { withRouter, Link, generatePath } from "react-router-dom";
import * as Routes from "routes";
import { connect } from "react-redux"


const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

const UserTitle = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const UserName = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 25.888px;
  color: #ffffff;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const UserSection = (props) => {
  return (
    <UserWrapper>
      <Link
        exact
        to={{
          pathname: generatePath(Routes.USER_PROFILE, {
            username: props.auth.userUid,
          }),
          state: { auth: props.postAuthor.userUid },
        }}
      >
        <Avatar image={props.postAuthor.avatar} size={60} />{" "}
      </Link>
      <UserNameWrapper>
        <UserTitle>Creator:</UserTitle>
        <UserName>{props.postAuthor.username}</UserName>
      </UserNameWrapper>
    </UserWrapper>
  );
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
    users: state.users
  };
}

export default connect(mapStatetoProps)(withRouter(UserSection))