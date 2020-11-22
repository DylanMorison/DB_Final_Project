import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";
import GearIcon from "../../components/icons/GearIcon";
import { logOut } from "../../actions";
import { Button } from "react-bootstrap";
import AddButton from "../../pages/People/AddButton"
import { connect, useSelector } from "react-redux";
import { followUser, unfollowUser} from "../../actions"

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

const Spacing = styled.div`
  padding-bottom: 10px;
`;


const UserSection = (props) => {
  console.log(props.userData)
  const loggedInUser = useSelector((state) => state.users.usersByUid[props.auth.userUid]);
  const thisUser = useSelector((state) => state.users.usersByUid[props.userData.userUid]);
  const [following, setFollowing] = useState(loggedInUser.following.includes(thisUser.userUid));


  const handleLogOut = (params) => {
    if (window.confirm("are you sure you want to log out?")) {
      props.logOut();
    }
  };

  const handleFollowing = () => {
    if (following) {
      props.unfollowUser(props.auth.userUid, thisUser.userUid)
      setFollowing(!following);
    }
    else{
      props.followUser(props.auth.userUid, thisUser.userUid)
      setFollowing(!following);
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
          <UserName>{props.userData.username}</UserName>
          <Spacing/>
          <AddButton handleFollowing={handleFollowing} following={following} />
        </UserNameWrapper>
      </UserWrapper>
    </>
  );
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
    users: state.users
  };
}

export default connect(mapStatetoProps, {  followUser, unfollowUser })(UserSection);
