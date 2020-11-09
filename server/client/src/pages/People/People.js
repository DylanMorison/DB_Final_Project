import React, { Fragment } from "react";
import styled from "styled-components";

import { Container } from "components/Layout";
import Skeleton from "components/Skeleton";
import { Loading } from "components/Loading";
import Empty from "components/Empty";
import InfiniteScroll from "components/InfiniteScroll";
import Head from "components/Head";
import PeopleCard from "./PeopleCard";

import { PEOPLE_PAGE_USERS_LIMIT } from "constants/DataLimit";

import { useStore } from "store";
import { connect } from "react-redux";

const Root = styled(Container)`
  margin-top: ${(p) => p.theme.spacing.lg};

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    margin-left: ${(p) => p.theme.spacing.lg};
    padding: 0;
  }
`;

const PeopleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${(p) => p.theme.spacing.lg};

  @media (max-width: 1520px) {
    grid-template-columns: repeat(2, 3fr);
  }

  @media (max-width: 1170px) {
    grid-template-columns: repeat(1, 3fr);
  }

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 3fr);
  }

  @media (max-width: 702px) {
    grid-template-columns: repeat(1, 3fr);
  }
`;

const Person = styled.div`
  height: 400px;
  width: 200px;
  background-color: white;
`;

/**
 * People page
 */
const People = (props) => {
  // let otherUsers = [];
  // props.users.people.forEach((person) => {
  //   if (person.uid != props.auth.uid) {
  //     otherUsers.push(person);
  //   }
  // });

  return (
    <Root maxWidth="md">
      <PeopleContainer>
        {props.users.allUserUids.length > 0 ? (
          props.users.allUserUids.map((userUid) => <PeopleCard userUid={userUid} />)
        ) : (
          <div> no people </div>
        )}
      </PeopleContainer>
    </Root>
  );
};

function mapStatetoProps(state) {
  return {
    users: state.users,
    auth: state.auth,
  };
}

export default connect(mapStatetoProps)(People);
