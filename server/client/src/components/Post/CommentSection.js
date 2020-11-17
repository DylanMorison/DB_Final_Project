import React from "react";
import styled from "styled-components";
import Comment from "../Comment";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { userAddComment } from "../../actions";
import { useSelector } from "react-redux";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50vw;
  background: rgba(142, 142, 142, 0.3);
  height: 300px;
  border-radius: 10px;
  padding: 25px;
  color: #ffffff;

  @media (max-width: 1000px) {
    width: 85vw;
  }
`;

const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(128, 128, 128, 0.78);
  border-radius: 84px;
  height: 60px;
  padding: 15px;
`;

const CommentButton = styled.button`
  width: 92.8px;
  height: 45px;
  background: #149bde;
  border-radius: 84px;
  border: none;
  color: #ffffff;
`;

const CommentInput = styled.input`
  width: 80%;
  height: 45px;
  background: none;
  border-radius: 84px;
  border: none;
  outline: none;
  color: #ffffff;
`;

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  justify-self: flex-start;
  align-items: flex-start;
  align-self: flex-start;
  padding-top: 25px;
  padding: 10px;
  height: 300px;
  width: 100%
  overflow-y: auto;
  margin-top: 10px;



`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 1px;
  color: red;
`;

const CommentSection = (props) => {
  const handleCommentSubmit = (content) => {
    const commentData = {
      user_id: props.auth.userUid,
      content: content,
    };
    props.userAddComment(props.postData.postUid, commentData);
  };

  return (
    <Formik
      initialValues={{
        content: "",
      }}
      validationSchema={Yup.object({
        content: Yup.string()
          .max(50, "Must be 50 characters or less")
          .required("Required"),
      })}
      onSubmit={({ content }, { resetForm }) => {
        handleCommentSubmit(content);
        resetForm();
      }}
    >
      {({
        values: { content },
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form id="commentForm" onSubmit={handleSubmit}>
          <Root>
            <CommentInputWrapper>
              <CommentInput
                id="content"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                name="content"
                value={content}
                placeholder="write a comment"
              />
              <CommentButton type="submit">Submit</CommentButton>
              {content && errors.content ? (
                <ErrorMessage>{errors.content}</ErrorMessage>
              ) : null}
            </CommentInputWrapper>
            <CommentsWrapper>
              {props.postData.comments.length > 0 ? (
                props.postData.comments.map((comment) => (
                  <Comment
                    user_id={comment.user_id}
                    content={comment.content}
                  />
                ))
              ) : (
                <div>no comments</div>
              )}
            </CommentsWrapper>
          </Root>
        </form>
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

export default connect(mapStatetoProps, { userAddComment })(CommentSection);

