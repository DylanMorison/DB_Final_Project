import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "components/Avatar";

import { useStore } from "store";



import { USER_SUGGESTIONS_WIDTH, HEADER_HEIGHT } from "constants/Layout";



const Root = styled.div`
  display: none;
  background-color: inherit;
  position: sticky;
  top: ${HEADER_HEIGHT + 40}px;
  right: 0;
  height: 100%;
  width: ${USER_SUGGESTIONS_WIDTH}px;
  padding: ${(p) => p.theme.spacing.sm};
  border-radius: ${(p) => p.theme.radius.sm};


`;

{
//@media (min-width: ${(p) => p.theme.screen.md}) {
 // display: block;

 //code to display user suggestions ^^^^
}


const List = styled.ul`
  padding: 0;
  padding-top: ${(p) => p.theme.spacing.xs};
`;

const ListItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin-bottom: ${(p) => p.theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FullName = styled.div`
  color: white;
  font-family: proxima-nova;
  font-size: 17px;
`;

const UserName = styled.div`
  color: #dcdcdc;
  font-family: proxima-nova;
`;

const Heading = styled.div`
  color: white;
  font-size: 25.888px;
  font-family: aktiv-grotesk;
`;

/**
 * Displays user suggestions
 */
const UserSuggestions = ({ pathname }) => {


  return (
    <Root>
      <Heading>Suggestions</Heading>

      <List>
          <ListItem >
              <Avatar  size={50} />

                <FullName>name</FullName>
                <UserName>UserName</UserName>
          </ListItem>
      </List>
    </Root>
  );
};

UserSuggestions.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default UserSuggestions;
