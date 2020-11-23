import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { generatePath } from "react-router-dom";

import { A } from "components/Text";
import { Spacing } from "components/Layout";
import theme from "theme";

import * as Routes from "routes";
import Avatar from "../../components/Avatar";
import AddButton from "./AddButton";
import { withRouter, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { followUser, unfollowUser} from "../../actions"

const Root = styled.div`
  width: 312px;
  height: 400px;
  background: #404040;
  border-radius: 8.64545px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;
`;

const UserName = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 25.888px;
  color: #ffffff;
  padding-top: 15px;
  padding-bottom: 35px;
  text-align: center;
`;

const UserBio = styled.div`
  font-size: 15.2px;
  font-weight: normal;
  font-family: proxima-nova;
  color: #ffffff;
  text-align: center;
  padding-bottom: 35px;
`;

const PeopleCard = (props) => {

  const loggedInUser = useSelector((state) => state.users.usersByUid[props.auth.userUid]);
  const thisUser = useSelector((state) => state.users.usersByUid[props.userUid]);
  const [following, setFollowing] = useState(loggedInUser.following.includes(thisUser.userUid));

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
  // userUid
  return (
    (thisUser.userUid != props.auth.userUid ? 
    <Root>
      <Link
        exact
        to={{
          pathname: generatePath(Routes.USER_PROFILE, {
            username: props.userUid,
          }),
          state: { auth: props.userUid },
        }}
      >
        <Avatar size={70} image={thisUser.avatar} />
      </Link>
      <UserName>{thisUser.username}</UserName>
      <UserBio>
        {thisUser.following.length} following <span> &#9679; </span> 
         {thisUser.followers.length} followers
      </UserBio>
      <AddButton handleFollowing={handleFollowing} following={following} />
    </Root>
    :
    null
    )
  );
};

function mapStatetoProps(state) {
  return {
    users: state.users,
    auth: state.auth,
  };
}

export default connect(mapStatetoProps, {followUser, unfollowUser})(PeopleCard);


