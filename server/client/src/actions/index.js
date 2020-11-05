import axios from "axios";
import { FETCH_USERS, USER_LOGIN, USER_LOGOUT, ADD_POST, TOGGLE_LIKE } from "./types";

export const getAllUsers = () => async (dispatch) => {
  const res = await axios.get("/auth/users");
  dispatch({ type: FETCH_USERS, payload: res.data });
};

export const createUser = (userData) => async (dispatch) => {
  const res = await axios.post("/auth/register", userData); //creates the user in the DB
  console.log(res);
  console.log("User Created");

  //after your route is finished should return data like this below
  const userState = {
    username: userData.username,
    email: userData.email,
    uid: "dfwhjkewh121281928", //will be generated by backend
    Fullname: userData.Fullname,
    isLoggedIn: true,
  };

  dispatch({ type: USER_LOGIN, payload: userState }); //use USER LOGIN reducer to trigger app login (payload will be res.data)
};

export const logOut = () => async (dispatch) => {
  // const res = await axios.post   # Your DB Call here <---
  console.log("Log Out");

  const emptyState = {
    username: null,
    email: null,
    uid: null,
    Fullname: null,
    isLoggedIn: false,
  };

  dispatch({ type: USER_LOGOUT, payload: emptyState });
};

export const signInUser = (username, password) => async (dispatch) => {
  // const res = await axios.post   # Your DB Call here <---
  console.log("Sign IN");
  console.log(username, " ", password);

  const userState = {
    // this information will be populated by the backend
    username: "userData.username",
    email: "userData.email",
    uid: "dfwhjkewh121281928",
    Fullname: "userData.Fullname",
    isLoggedIn: true,
  };
  dispatch({ type: USER_LOGIN, payload: userState });
};

export const userAddPost = (postData) => async (dispatch) => {
  // const res = await axios.post   # Your DB Call here <---
  console.log("add post");
  console.log(postData);
  //parsing of timestamp should occur in backend
  dispatch({ type: ADD_POST, payload: postData });
};

export const userToggleLike = (userLiked, postData) => (dispatch) => {
  // const res = await axios.post   # Your DB Call here <---
  console.log("toggle like");
  console.log(postData, userLiked);
  dispatch({type: TOGGLE_LIKE, payload: postData});
};
