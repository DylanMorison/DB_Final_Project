import axios from "axios";
import { map, mapKeys } from "lodash";
import {
  FETCH_USERS,
  USER_LOGIN,
  USER_LOGOUT,
  ADD_POST,
  DELETE_LIKE,
  ADD_COMMENT,
  CREATE_USER,
  TOGGLE_FOLLOW,
  USER_ADD_POST,
  ADD_LIKE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  ADD_EXPLORE_POST,
  ADD_FOLLOWER,
  UNADD_FOLLOWER,
  ADD_HOME_POSTS,
  USER_ADD_HOME_POST,
  CLEAR_EXPLORE,
  CLEAR_POSTS,
  CLEAR_HOME,
  CLEAR_USERS,
} from "./types";

export const getAllUsers = () => async (dispatch) => {
  const res = await axios.get("/auth/users");
  dispatch({ type: FETCH_USERS, payload: res.data });
};

export const createUser = (newUserData) => async (dispatch) => {
  const createdUser = await axios.post("/auth/register", newUserData); //creates the user in the DB
  debugger;
  const { username, password } = createdUser.data;
  const res = await axios.post("/auth/login", { username, password });
  console.log("Sign IN");
  console.log(username, " ", password);
  console.log("response in signInUser", res.data);
  if (!res) {
    alert("No Match!");
  }
  const userAuth = {
    userUid: res.data.user_id, //will be generated by backend
  };

  let userPosts = [];
  const postsMap = res.data.userPostResult.map((post) =>
    userPosts.push(post.postUid)
  );

  const userState = {
    userData: {
      username: res.data.username,
      email: res.data.email,
      userUid: res.data.user_id,
      fullName: res.data.fullName,
      followers: res.data.userFollowers,
      following: res.data.userFollowing,
      posts: userPosts,
    },
    userUid: res.data.user_id,
  };
  dispatch({ type: CREATE_USER, payload: userState }); //this will be when the user is created and added to redux store\\

  res.data.userData.map((user) => {
    dispatch({ type: CREATE_USER, payload: user });
  });

  dispatch({ type: USER_LOGIN, payload: userAuth });
  res.data.postDataArray.map((postData) => {
    dispatch({ type: ADD_POST, payload: postData });
  });
  res.data.explorePostArray.map((postData) => {
    dispatch({ type: ADD_EXPLORE_POST, payload: postData });
  });
  res.data.homePostArray.map((postData) => {
    dispatch({ type: ADD_HOME_POSTS, payload: postData });
  });
};

export const logOut = () => async (dispatch) => {
  // const res = await axios.post   # Your DB Call here <---
  console.log("Log Out");

  const emptyState = {
    userUid: null,
  };

  dispatch({ type: USER_LOGOUT, payload: emptyState });
  dispatch({ type: CLEAR_EXPLORE });
  dispatch({ type: CLEAR_POSTS });
  dispatch({ type: CLEAR_HOME });
  dispatch({ type: CLEAR_USERS });
};

export const signInUser = (username, password) => async (dispatch) => {
  const res = await axios.post("/auth/login", { username, password });
  console.log("Sign IN");
  console.log(username, " ", password);
  console.log("response in signInUser", res.data);
  if (!res) {
    alert("No Match!");
  }
  const userAuth = {
    userUid: res.data.user_id, //will be generated by backend
  };

  let userPosts = [];
  const postsMap = res.data.userPostResult.map((post) =>
    userPosts.push(post.postUid)
  );

  const userState = {
    userData: {
      username: res.data.username,
      email: res.data.email,
      userUid: res.data.user_id,
      fullName: res.data.fullName,
      followers: res.data.userFollowers,
      following: res.data.userFollowing,
      posts: userPosts,
    },
    userUid: res.data.user_id,
  };
  dispatch({ type: CREATE_USER, payload: userState }); //this will be when the user is created and added to redux store\\

  res.data.userData.map((user) => {
    dispatch({ type: CREATE_USER, payload: user });
  });

  dispatch({ type: USER_LOGIN, payload: userAuth });
  res.data.postDataArray.map((postData) => {
    dispatch({ type: ADD_POST, payload: postData });
  });
  res.data.explorePostArray.map((postData) => {
    dispatch({ type: ADD_EXPLORE_POST, payload: postData });
  });
  res.data.homePostArray.map((postData) => {
    dispatch({ type: ADD_HOME_POSTS, payload: postData });
  });
};

export const userAddPost = (thisPostData) => async (dispatch) => {
  const res = await axios.post("/api/posts/create", thisPostData);

  const postData = {
    postData: {
      title: res.data.title,
      postUid: res.data.insertId,
      description: res.data.description,
      file: res.data.file,
      thumbnail: res.data.thumbnail,
      authorUid: res.data.authorUid,
      timestamp: res.data.timestamp,
      numLikes: res.data.numLikes,
      numComments: res.data.numComments,
      usersLiked: res.data.usersLiked,
      comments: res.data.comments,
    },
    postUid: res.data.insertId,
  };

  const userPost = {
    postUid: res.data.insertId,
    userUid: res.data.authorUid,
  };

  const homePost = {
    postUid: res.data.insertId,
  };

  dispatch({ type: ADD_POST, payload: postData });
  dispatch({ type: USER_ADD_POST, payload: userPost });
  dispatch({ type: ADD_HOME_POSTS, payload: homePost });
};

// get all posts done by one user

export const deleteLike = (userLiked, postUid) => async (dispatch) => {
  const likeData = {
    user_id: userLiked,
    postUid: postUid,
  };
  const res = await axios.post("/api/posts/deletelike", likeData);
  console.log("delete like");
  const deletedLikeObject = {
    userLiked: res.data.user_id,
    postUid: res.data.postUid,
  };
  dispatch({ type: DELETE_LIKE, payload: deletedLikeObject });
};

export const addLike = (userLiked, postUid) => async (dispatch) => {
  const likeData = {
    user_id: userLiked,
    postUid: postUid,
  };
  const res = await axios.post("/api/posts/addlike", likeData);
  const likeObject = {
    userLiked: res.data.user_id,
    postUid: res.data.postUid,
  };
  console.log("likeObject", likeObject);

  dispatch({ type: ADD_LIKE, payload: likeObject });
};

export const userAddComment = (thisPostUid, newCommentData) => async (
  dispatch
) => {
  const commentData = {
    user_id: newCommentData.user_id,
    content: newCommentData.content,
    postUid: thisPostUid,
  };
  const res = await axios.post("/api/posts/addcomment", commentData);

  const payload = {
    commentData: {
      user_id: res.data.user_id,
      content: res.data.content,
    },
    postUid: res.data.postUid,
  };

  dispatch({ type: ADD_COMMENT, payload: payload });
};

export const followUser = (currentUser, userFollowed) => async (dispatch) => {
  const followData = {
    follower_id: currentUser,
    followee_id: userFollowed,
  };
  const res = await axios.post("/api/posts/followuser", followData);

  const userPayload = {
    userUid: res.data.follower_id,
    followedUser: res.data.followee_id,
  };

  const followedUserPayload = {
    userUid: res.data.followee_id,
    newFollower: res.data.follower_id,
  };

  dispatch({ type: FOLLOW_USER, payload: userPayload });
  dispatch({ type: ADD_FOLLOWER, payload: followedUserPayload });
};

export const unfollowUser = (currentUser, userFollowed) => async (dispatch) => {
  const followData = {
    follower_id: currentUser,
    followee_id: userFollowed,
  };
  const res = await axios.post("/api/posts/unfollowuser", followData);

  const userPayload = {
    userUid: res.data.follower_id,
    followedUser: res.data.followee_id,
  };

  const unfollowedUserPayload = {
    userUid: res.data.followee_id,
    unFollower: res.data.follower_id,
  };

  dispatch({ type: UNFOLLOW_USER, payload: userPayload });
  dispatch({ type: UNADD_FOLLOWER, payload: unfollowedUserPayload });
};

export const updateData = (
  username,
  users,
  posts,
  home,
  explore,
  postsInfo
) => async (dispatch) => {
  // let password = "dummyPa$$word1!"
  const currentData = {
    username: username,
    postUids: posts,
    homeUids: home,
    exploreUids: explore,
  };
  const res = await axios.post("/api/posts/updatedata", currentData);
  let userDifference = res.data.userUids.filter(
    (userId) => !users.includes(userId)
  );
  let postDifference = res.data.userPostsUids.filter(
    (postUid) => !posts.includes(postUid)
  );
  let homeDifference = res.data.userHomePostsUids.filter(
    (postUid) => !home.includes(postUid)
  );
  let exploreDifference = res.data.userExplorePostsUids.filter(
    (postUid) => !explore.includes(postUid)
  );
  console.log("res.data.userHomePostsUids", res.data.userHomePostsUids);
  console.log("res.data.userExplorePostsUids", res.data.userExplorePostsUids);

  if (userDifference.length > 0) {
    console.log("user update");

    res.data.userData.map((user) => {
      if (!users.includes(user.userData.userUid)) {
        console.log("check", user.userData.userUid);
        console.log(userDifference);
        dispatch({ type: CREATE_USER, payload: user });
      }
    });
  }
  res.data.postDataArray.map((post) => {
    if (!posts.includes(post.postData.postUid)) {
      console.log("check", post.postData.postUid);
      console.log(res.data.userPostsUids, "res.data.userPostsUids")
      console.log(postDifference);
      dispatch({ type: ADD_POST, payload: post });
      const userPost = {
        postUid: post.postData.postUid,
        userUid: post.postData.authorUid,
      };
      console.log("check", userPost);

      dispatch({ type: USER_ADD_POST, payload: userPost });
      //here add user post into array
    } else {
      let likeDifference = post.postData.usersLiked.filter(
        (userUid) =>
          !postsInfo[post.postData.postUid].usersLiked.includes(userUid)
      );
      let likeDelete = postsInfo[post.postData.postUid].usersLiked.filter(
        (userUid) =>
          !post.postData.usersLiked.includes(userUid) &&
          !likeDifference.includes(userUid) 
      );

      //  UPDATE LIKES
      likeDifference.map((likeId) => {
        const likeObject = {
          userLiked: likeId,
          postUid: post.postData.postUid,
        };
        dispatch({ type: ADD_LIKE, payload: likeObject });
      });
      likeDelete.map((likeId) => {
        const deletedLikeObject = {
          userLiked: likeId,
          postUid: post.postData.postUid,
        };
        dispatch({ type: DELETE_LIKE, payload: deletedLikeObject });
      });

      //  UPDATE COMMENTS
      let commentDifference =
        post.postData.comments.length -
        postsInfo[post.postData.postUid].comments.length;
      let currentNumComments = postsInfo[post.postData.postUid].comments.length;

      for (
        let index = currentNumComments;
        index < currentNumComments + commentDifference;
        index++
      ) {
        const commentData = post.postData.comments[index];
        const payload = {
          commentData: {
            user_id: commentData.user_id,
            content: commentData.content,
          },
          postUid: post.postData.postUid,
        };

        dispatch({ type: ADD_COMMENT, payload: payload });
      }
    }
  });

  if (homeDifference.length > 0) {
    console.log("home update0", homeDifference);
  }
  if (exploreDifference.length > 0) {
    console.log("explore update0", exploreDifference);
  }

  console.log(res.data);
  // console.log("userdata", res.data.userData)

  // ...user,
  // userPostsUids,
  // postDataArray,
  // userExplorePostsUids,
  // explorePostArray,
  // userHomePostsUids,
  // homePostArray,
  // userData,
  // userUids,
  // userPostResult
};
