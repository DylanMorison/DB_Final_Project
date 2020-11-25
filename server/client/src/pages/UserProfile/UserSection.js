import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";
import GearIcon from "../../components/icons/GearIcon";
import AddButton from "../../pages/People/AddButton";
import { connect, useSelector } from "react-redux";
import { logOut, followUser, unfollowUser } from "../../actions";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateAvatar } from "../../actions";

import { storage } from "../../Firebase/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import ThumbnailUploadIcon from "../../img/ThumbnailUpload.svg";
import UploadIcon from "../../img/UploadIcon.svg";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Formik } from "formik";
import * as Yup from "yup";

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

const ErrorMessage = styled.div`
  padding: 5px;
  color: red;
`;

const UserName = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 18.888px;
  color: #ffffff;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const SpacingSmall = styled.div`
  padding-bottom: 7px;
`;

const useStyles = makeStyles({
  root: {
    background: "#02ABFF",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 3px 5px 2px rgba(8, 93, 132, .3)",
    color: "white",
    height: "35px",
    width: "150px",
    cursor: "pointer",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#149bde",
      color: "#fff",
    },
  },
  submitButton: {
    background: "#149bde",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 3px 5px 2px rgba(8, 93, 132, .3)",
    color: "white",
    height: "25px",
    width: "70px",
    cursor: "pointer",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#02ABFF",
      color: "#fff",
    },
  },
});

const UserSection = (props) => {
  const UploadInput = styled.input``;
  const firebaseApp = firebase.apps[0];
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const user = firebase.auth().currentUser;
  const [isOpen, setOpen] = useState(false);

  console.log(props.userData);
  const loggedInUser = useSelector(
    (state) => state.users.usersByUid[props.auth.userUid]
  );
  const thisUser = useSelector(
    (state) => state.users.usersByUid[props.userData.userUid]
  );
  const [following, setFollowing] = useState(
    loggedInUser.following.includes(thisUser.userUid)
  );

  const confirmAvatarChange = (uploadedFile) => {
    if (window.confirm("are you sure you want to change your avatar?")) {
      console.log(uploadedFile);
      props.updateAvatar(props.auth.userUid, uploadedFile);
      //make the function to add it in the database
    }
  };

  const handleLogOut = (params) => {
    if (window.confirm("are you sure you want to log out?")) {
      props.logOut();
    }
  };

  const handleFollowing = () => {
    if (following) {
      props.unfollowUser(props.auth.userUid, thisUser.userUid);
      setFollowing(!following);
    } else {
      props.followUser(props.auth.userUid, thisUser.userUid);
      setFollowing(!following);
    }
  };

  let handleFireBaseUpload = (inputFile) => {
    return new Promise((resolve, reject) => {
      //e.preventDefault()
      console.log("start of upload");
      // async magic goes here...
      if (inputFile === "") {
        console.error(`not a file`);
      }
      const uploadTask = storage
        .ref(`/images/${inputFile.name}`)
        .put(inputFile);
      //initiates the firebase side uploading
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot);
        },
        (err) => {
          //catches the errors
          console.log(err);
          reject("failure");
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref("images")
            .child(inputFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setImageAsUrl((prevObject) => ({
                ...prevObject,
                imgUrl: fireBaseUrl,
              }));
              console.log(fireBaseUrl);
              resolve(fireBaseUrl);
            });
        }
      );
    });
  };

  const handleUpload = async (profilePic) => {
    // handleOpen()
    const uploadedFile = await handleFireBaseUpload(profilePic);
    // handleOpen()
    confirmAvatarChange(uploadedFile);
  };

  const classes = useStyles();

  return (
    <>
      <UserWrapper>
        <AvatarWrapper>
          <Avatar
            style={{ zIndex: 3 }}
            image={props.userData.avatar}
            size={110}
          />
          {loggedInUser.userUid === thisUser.userUid ? (
            <SettingsButton onClick={handleLogOut}>
              <GearIcon />
            </SettingsButton>
          ) : null}
        </AvatarWrapper>
        <UserNameWrapper>
          <UserTitle>Creator:</UserTitle>
          <UserName>{props.userData.username}</UserName>
          <Spacing />
          {loggedInUser.userUid === thisUser.userUid ? (
            <Formik
              initialValues={{
                profilePic: "",
              }}
              validationSchema={Yup.object({
                profilePic: Yup.mixed().required("A file is required"),
              })}
              onSubmit={({ profilePic }, { resetForm }) => {
                handleUpload(profilePic);
                resetForm();
              }}
            >
              {({
                values: { profilePic },
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <ButtonWrapper>
                    <label htmlFor="profilePic">
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="profilePic"
                        onChange={(event) => {
                          setFieldValue(
                            "profilePic",
                            event.currentTarget.files[0]
                          );
                        }}
                        name="profilePic"
                      />
                      <Fab
                        className={classes.root}
                        color="primary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                      >
                        <AddIcon /> Upload photo
                      </Fab>
                      {profilePic && errors.profilePic ? (
                        <ErrorMessage>{errors.profilePic}</ErrorMessage>
                      ) : null}
                    </label>
                    {profilePic ? (
                      <>
                        <SpacingSmall />
                        <Button type="submit" className={classes.submitButton}>
                          Submit
                        </Button>
                      </>
                    ) : null}
                  </ButtonWrapper>
                </form>
              )}
            </Formik>
          ) : (
            <AddButton
              handleFollowing={handleFollowing}
              following={following}
            />
          )}
        </UserNameWrapper>
      </UserWrapper>
    </>
  );
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
    users: state.users,
  };
}

export default connect(mapStatetoProps, {
  logOut,
  followUser,
  unfollowUser,
  updateAvatar,
})(UserSection);
