import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PostAvatar from "./PostAvatar";
import ThumbnailUpload from "./UploadButtons/ThumbnailUpload";
import FileUpload from "./UploadButtons/FileUpload";
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
import { userAddPost } from "../../actions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "#149bde",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 3px 5px 2px rgba(8, 93, 132, .3)",
    color: "white",
    height: "45px",
    width: "100px",
    cursor: "pointer",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#02ABFF",
      color: "#fff",
    },
  },
  backdrop: {
    zIndex: 2000,
    color: '#fff',
  },
});

const ErrorMessage = styled.div`
  padding: 5px;
  color: red;
`;

const Popup = styled.div`
  margin: 15% auto; /* 15% from the top and centered */
  padding: 25px;
  border: none;
  width: 60vw;
  height: 30vw;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 25fr 75fr;
  grid-template-rows: auto;
  color: black;
  grid-gap: 10px;
  background: rgba(77, 77, 77, 0.9);

  &:before {
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
    filter: blur(10px);
  }

  @media (max-width: 1600) {
    height: 50vw;
  }
`;

const LeftWrapper = styled.div`
  width: 100%
  height: 100%;
`;

const RightWrapper = styled.div`
  display: flex;
  width: 100%
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin-right: 25px;
`;

const Title = styled.textarea`
  width: 100%
  height: 100%;
  background: #A2A2A2;
  border-radius: 8px;
  border: none; 
  outline: none;
  resize: none;
  overflow: auto;
  color: white;
  padding: 12px 20px;
 

`;

const Description = styled.textarea`
  width: 100%
  height: 100%;
  background: #A2A2A2;
  border-radius: 8px;
  border: none; 
  outline: none;
  resize: none;
  overflow: auto;
  color: white;
  padding: 12px 20px;

`;

const TitleWrapper = styled.div`
  width: 100%
  height: 60px;
  padding-bottom: 15px;
  `;

const DescriptionWrapper = styled.div`
  width: 100%
  height: 50%;
  `;

const Form = styled.form`
  width: 100%
  height: 50%;
  `;

const StyledInput = styled.input`
  border: 1px solid #000;
  border-radius: 10px;

  margin: 5px;
  width: 150px;
  box-sizing: border-box;
  background: ${(prop) => (prop.correct ? "white" : "red")};
`;

const UploadButtons = styled.div`
  display: flex;
  width: 100%
  height: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 45px;
  border: none;
  margin-left: 20px;
  color: white;
  background: #149bde;
  border-radius: 54px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spacing = styled.div`
  padding-bottom: 15px;
`;

const UploadInput = styled.input``;
const PostPopup = (props) => {
  const firebaseApp = firebase.apps[0];
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const user = firebase.auth().currentUser;
  const [isOpen, setOpen] = useState(false)

  const classes = useStyles();


  const SUPPORTED_FORMATS = [
    "image/JPG",
    "image/JPEG",
    "image/gif",
    "image/PNG",
  ];

  const handleOpen = ( ) => {
    setOpen(!isOpen)
  }
  

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

  const handleUpload = async (title, description, file, thumbnail) => {
    handleOpen()
    const uploadedFile = await handleFireBaseUpload(file);
    const uploadedThumbnail = await handleFireBaseUpload(thumbnail);
    handleOpen()
    console.log(uploadedFile, uploadedThumbnail);

    const postData = {
      title: title,
      description: description,
      file: uploadedFile,
      thumbnail: uploadedThumbnail,
      authorUid: props.auth.userUid,
      timestamp: Date.now(),
      numLikes: 0,
      numComments: 0,
      usersLiked: [],
      comments: [],
    };
    props.userAddPost(postData);
    props.buttonClick();
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        thumbnail: "",
        file: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("title required"),
        description: Yup.string().required("description required"),
        file: Yup.mixed().required("A file is required"),
        thumbnail: Yup.mixed().required("A thumbnail is required"),
      })}
      onSubmit={({ title, description, file, thumbnail }) => {
        handleUpload(title, description, file, thumbnail);
      }}
    >
      {({
        values: { title, description, thumbnail, file },
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <Popup>
          <LeftWrapper>
            <PostAvatar buttonClick={props.buttonClick} />
          </LeftWrapper>
          <RightWrapper>
            <Form onSubmit={handleSubmit}>
              <TitleWrapper>
                <Title
                  id="title"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="title"
                  value={title}
                  aria-label="title"
                  aria-required="true"
                  autoComplete="new-password"
                  placeholder="title"
                />
              </TitleWrapper>
              {errors.title ? (
                <ErrorMessage>{errors.title}</ErrorMessage>
              ) : null}
              <DescriptionWrapper>
                <Description
                  id="description"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="description"
                  value={description}
                  aria-label="description"
                  aria-required="true"
                  autoComplete="new-password"
                  placeholder="description"
                />
              </DescriptionWrapper>
              {errors.description ? (
                <ErrorMessage>{errors.description}</ErrorMessage>
              ) : null}
              <UploadButtons>
                <FileInputWrapper>
                  <Spacing>
                    <img
                      style={{ width: "50px", cursor: "pointer" }}
                      src={UploadIcon}
                      alt="file upload"
                    />
                  </Spacing>
                  <input
                    type="file"
                    id="file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    name="file"
                    style={{ color: "white" }}
                    // style={{ display: "none" }}
                  />
                  {errors && errors.file ? (
                    <ErrorMessage>{errors.file}</ErrorMessage>
                  ) : null}
                </FileInputWrapper>

                <ButtonWrapper>
                  <FileInputWrapper>
                    <img
                      style={{ width: "80px", cursor: "pointer" }}
                      src={ThumbnailUploadIcon}
                      alt="thumnbail upload"
                    />
                    <input
                      type="file"
                      id="thumbnail"
                      onChange={(event) => {
                        setFieldValue(
                          "thumbnail",
                          event.currentTarget.files[0]
                        );
                      }}
                      name="thumbnail"
                      style={{ color: "white" }}
                    />
                    {thumbnail && errors.thumbnail ? (
                      <ErrorMessage>{errors.thumbnail}</ErrorMessage>
                    ) : null}
                  </FileInputWrapper>
                </ButtonWrapper>
                <Button type="submit" className={classes.root}>
                  Submit
                </Button>
              </UploadButtons>
            </Form>
          </RightWrapper>
          <Backdrop className={classes.backdrop} open={isOpen}>
            <CircularProgress color="white" />
          </Backdrop>
        </Popup>
      )}
    </Formik>
  );
};

function mapStatetoProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

export default connect(mapStatetoProps, { userAddPost })(PostPopup);

// width: 0.1px;
// height: 0.1px;
// opacity: 0;
// overflow: hidden;
// position: absolute;
// z-index: -1;
