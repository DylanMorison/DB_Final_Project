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
import { userToggleFollow } from "../../actions";
import { auth } from "firebase";

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
  const [following, setFollowing] = useState(false);
  const thisUser = useSelector((state) => state.users.usersByUid[props.userUid]);

  const handleFollowing = () => {
    // if (following) {
    //   let newFollowing = [];
    //   props.auth.userFollowing.forEach((person) => {
    //     if (person.uid != props.personData.uid) {
    //       newFollowing.push(person);
    //     }
    //   });
    //   props.auth.userFollowing = newFollowing;

    // }
    // else{

    // }
    setFollowing(!following);
  };
  // userUid
  return (
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
        <Avatar size={70} />
      </Link>
      <UserName>{thisUser.username}</UserName>
      <UserBio>
        {thisUser.following} following <span> &#9679;</span>{" "}
        {thisUser.followers} followers
      </UserBio>
      <AddButton handleFollowing={handleFollowing} following={following} />
    </Root>
  );
};

function mapStatetoProps(state) {
  return {
    users: state.users,
    auth: state.auth,
  };
}

export default connect(mapStatetoProps, { userToggleFollow })(PeopleCard);
