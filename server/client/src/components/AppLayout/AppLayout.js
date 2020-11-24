import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "components/App/Header";
import NotFound from "components/NotFound";
import SideBar from "../App/SideBar";
import UserSuggestions from "../App/UserSuggestions";

import Home from "pages/Home";
import Explore from "pages/Explore";
import People from "pages/People";
import UserProfile from "pages/UserProfile";

import { useWindowSize } from "hooks/useWindowSize";
import { useClickOutside } from "hooks/useClickOutside";

import * as Routes from "routes";

import theme from "theme";

import { useStore } from "store";
import { SET_AUTH_USER } from "store/auth";
import { connect, useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HeroModelCreator from "./HeroModelCreator";
import HomeBackground from "../../img/HomeBackground.svg";

import CreatePost from "../CreatePost/CreatePost";

import styles from "./ServiceStyle.module.css";
import { updateData } from "../../actions";
//className={styles.container}>

const Root = styled.div`
  position: absolute;
  width: 100%;
  background: inherit;
  /*background-image: url(${HomeBackground});*/
  color: white;
  padding-bottom: 100px;
  z-index: 1;
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #1ca7ec;

  @media (max-width: 800px) {
    display: none;
  }
`;



const HeroContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  height: 200px;
`;

const HeroModelName = styled.p`
  font-family: aktiv-grotesk;
  font-style: normal;
  font-weight: 800;
  font-size: 30.888px;
  line-height: 33px;
  color: #ffffff;
`;

const BackgroundElement = styled.div`
  width: 100%;
  position: relative;
  background-color: #1ca7ec;
  background-image: url(${HomeBackground});
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  background-position: top;
  background-size: 100%;
  z-index: 3;
  height: 1100px;
  background-color: #1ca7ec;
`;

const CreatePostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 25px;

  @media (max-width: 1007px) {
    display: none;
  }
`;

/**
 * Main layout of the app, when user is authenticated
 */
const AppLayout = (props) => {
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width >= parseInt(theme.screen.md, 10);
  const [isSideBarOpen, setIsSidebarOpen] = useState(isDesktop);

  const sideBarRef = useRef("");
  const topPostData = useSelector(state => state.posts.postsByUids[props.topPost.topPostUid])
  const DesignOfWeek = topPostData.thumbnail

  const HeroImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  background: linear-gradient(
      30.67deg,
      #003959 4.59%,
      rgba(255, 255, 255, 0) 103.19%
    ),
    url(${DesignOfWeek});
  border-bottom: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;



  const screenLarge = useMediaQuery("(min-width: 971px)");
  const screenSmall = useMediaQuery("(max-width: 971px)");
  const thisUser = useSelector(
    (state) => state.users.usersByUid[props.auth.userUid]
  );

  // useClickOutside(sideBarRef, () => {
  //   if (!isDesktop && isSideBarOpen) {
  //     setIsSidebarOpen(false);
  //   }
  // });

  useClickOutside(sideBarRef, () => {
    if (!isDesktop && isSideBarOpen) {
      setIsSidebarOpen(false);
    }
  });

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    return () => {
      if (!isDesktop) {
        setIsSidebarOpen(false);
      }
    };
  }, [props.location.pathname, isDesktop]);

  const handleSidebar = (params) => {
    setIsSidebarOpen(!isSideBarOpen);
    console.log("test");
  };

  useEffect(() => {
    console.log("update data");
    const interval = setInterval(() => {
      console.log("This will run every 10 seconds!");
      props.updateData(
        thisUser.username,
        props.users.allUserUids,
        props.posts.allPostUids,
        props.homePosts.allPostUids,
        props.explorePosts.allPostUids,
        props.posts.postsByUids,
        props.users.usersByUid,
        props.topPost.topPostUid
      );
    }, 10000);
    return () => clearInterval(interval);
    //(username, users, posts, home, explore)
  }); // includes empty dependency array

  const GetSidebarMarginSize = () => {
    if (screenLarge) {
      return 10;
    } else if (screenSmall) {
      return 0;
    }
  };

  const GetHomeMarginSize = () => {
    if (screenLarge) {
      return 15;
    } else if (screenSmall) {
      return 0;
    }
  };
  const GetJustifyContent = () => {
    if (screenLarge) {
      return "flex-start";
    } else if (screenSmall) {
      return "center";
    }
  };

  return (
    <>
      <Header toggleSideBar={() => handleSidebar} />
      <Hero>
        <HeroImage>
          <HeroContent>
            <HeroModelName>Model of the week</HeroModelName>
            <HeroModelCreator
              AuthorName={"John Smith"}
              PostType={"Product Packaging"}
            ></HeroModelCreator>
          </HeroContent>
        </HeroImage>{" "}
      </Hero>
      <BackgroundElement>
        <Root>
          <Box
            flexDirection="row"
            justifyContent={GetJustifyContent()}
            display="flex"
            ml={GetSidebarMarginSize()}
          >
            <Box>
              <Box
                flexDirection="column"
                justifyContent="center"
                display="flex"
              >
                <Box pb={12}>
                  {" "}
                  <CreatePostWrapper>
                    <CreatePost />
                  </CreatePostWrapper>
                  <SideBar isOpen={isSideBarOpen} sideBarRef={sideBarRef} />
                </Box>
                <Box>
                  {" "}
                  <UserSuggestions />
                </Box>
              </Box>
            </Box>
            <Box pl={GetHomeMarginSize()}>
              <Switch>
                <Route exact path={Routes.HOME} component={Home} />

                <Route exact path={Routes.EXPLORE} component={Explore} />

                <Route exact path={Routes.PEOPLE} component={People} />

                <Route
                  exact
                  path={Routes.USER_PROFILE}
                  component={UserProfile}
                />

                <Route component={NotFound} />
              </Switch>
            </Box>
          </Box>
        </Root>
      </BackgroundElement>
    </>
  );
};

AppLayout.propTypes = {
  location: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
    homePosts: state.homePosts,
    explorePosts: state.explorePosts,
    users: state.users,
    posts: state.posts,
    topPost: state.topPost,
  };
}
export default connect(mapStatetoProps, { updateData })(withRouter(AppLayout));

//updateData
