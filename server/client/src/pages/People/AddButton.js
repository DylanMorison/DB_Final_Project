import React from "react";
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

import { Query } from "react-apollo";
import AddIcon from "../../components/icons/AddIcon";

const AddText = styled.div`
  font-size: 16px;
  font-family: proxima-nova;
  padding-left: 15px;
  height: 18px;
  padding-top: 2px;
`;
const AddWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

const Add = styled.button`
  width: 106px;
  height: 36px;
  background: #c4c4c4;
  border-radius: 109px;
  border: none;
`;

const Added = styled.button`
  width: 106px;
  height: 36px;
  background: #1ca7ec;
  border-radius: 109px;
  border: none;
  font-size: 16px;
  font-family: proxima-nova;
  color: white;
`;

const AddButton = (props) => {
  const handleButton = () => {
    if (props.following) {
      return <Added onClick={props.handleFollowing}>Added</Added>;
    } else {
      return (
        <Add onClick={props.handleFollowing}>
          <AddWrapper>
            <AddIcon /> <AddText>Add </AddText>
          </AddWrapper>
        </Add>
      );
    }
  };

  return <>{handleButton()}</>;
};

export default AddButton;
