import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import styled from "styled-components";

import { A } from "components/Text";
import { Spacing } from "components/Layout";
import { Error } from "components/Text";
import { InputText, Button } from "components/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import * as Routes from "routes";
import { signInUser } from "../../actions";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  font-size: ${(p) => p.theme.font.size.xxs};
  margin-top: ${(p) => p.theme.spacing.sm};
`;

const InputContainer = styled(Spacing)`
  width: 100%;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 1px;
  color: red;
`;

const ForgotPassword = styled.div`
  font-size: ${(p) => p.theme.font.size.xxs};
  margin-top: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.theme.colors.white};
`;

/**
 * Sign In page
 */
const SignIn = (props) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={({ username, password }) => {
        props.signInUser(username, password)
      }}
    >
      {({
        values: { username, password },
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form  onSubmit={handleSubmit}>
        <Root>
          <InputContainer>
            <InputText
              id="username"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              value={username}
              aria-label="username"
              aria-required="true"
              autoComplete="new-password"
              placeholder="username"
            />
            {username && errors.username ? (
              <ErrorMessage>{errors.username}</ErrorMessage>
            ) : null}
          </InputContainer>

          <InputContainer left="xs" right="xs">
            <InputText
              id="password"
              placeholder="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              value={password}
              aria-label="password"
              aria-required="true"
              autoComplete="new-password"
            />
            {errors.password ? (
              <ErrorMessage>{errors.password}</ErrorMessage>
            ) : null}
          </InputContainer>

          <Button type="submit">Log in</Button>
        </Root>
        </form>
      )}
    </Formik>
  );
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStatetoProps, { signInUser })(withRouter(SignIn));
