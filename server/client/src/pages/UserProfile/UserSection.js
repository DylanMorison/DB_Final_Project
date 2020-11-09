import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";
import GearIcon from "../../components/icons/GearIcon";
import { connect } from "react-redux";
import { logOut } from "../../actions";
import { Button } from "react-bootstrap";

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: relative;

  @media (max-width: 1200px) {
    flex-direction: row;
  }
`;
const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const UserTitle = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 300;
  font-size: 12px;
  color: #ffffff;
  padding-bottom: 5px;
`;

const UserName = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 18.888px;
  color: #ffffff;
`;

const SettingsButton = styled.div`
  display: flex;
  justify-self: flex-end;
  align-self: flex-start;
  z-index: 5;
  padding-left: 75px;
  position: absolute;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserSection = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const handleLogOut = (params) => {
    if (window.confirm("are you sure you want to log out?")) {
      props.logOut();
    }
  };

  return (
    <>
      <UserWrapper>
        <AvatarWrapper>
          <Avatar style={{ zIndex: 3 }} image={defaultPic} size={110} />
          <SettingsButton onClick={handleLogOut}>
            <GearIcon />
          </SettingsButton>
        </AvatarWrapper>
        <UserNameWrapper>
          <UserTitle>Creator:</UserTitle>
          <UserName>{"props.postUser"}</UserName>
        </UserNameWrapper>
      </UserWrapper>
    </>
  );
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStatetoProps, { logOut })(UserSection);
