import React from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import styled from 'styled-components';

import * as Routes from 'routes';

import {
  ExploreIcon,
  NotificationIcon,
  HomeIcon,
  PeopleIcon,
} from 'components/icons';

const Link = styled(NavLink)`
  text-decoration: none;
  transition: color 0.1s;
  color: ${p => p.theme.colors.text.primary};
  display: block;
  padding-left: ${p => p.theme.spacing.xs};

  &:hover,
  &.selected {
    border-right: 2px solid white;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  line-height: 40px;
  font-size: ${p => p.theme.font.size.xs};
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const Root = styled.div`
  height: 100%
`;


const Name = styled.div`
  margin-left: ${p => p.theme.spacing.sm};
  color: white; 
`;

/**
 * Navigation component used in SideBar
 */
const Navigation = () => {
  return (
    <Root>
    <List>
      <Link exact activeClassName="selected" to={Routes.HOME}>
        <ListItem>
          <HomeIcon />
          <Name>Home</Name>
        </ListItem>
      </Link>

      <Link exact activeClassName="selected" to={Routes.EXPLORE}>
        <ListItem>
          <ExploreIcon />
          <Name>Explore</Name>
        </ListItem>
      </Link>

      <Link exact activeClassName="selected" to={Routes.PEOPLE}>
        <ListItem>
          <PeopleIcon />
          <Name>People</Name>
        </ListItem>
      </Link>
    </List>
    </Root>
  );
};

export default Navigation;
