import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { A } from 'components/Text';
import { Spacing } from 'components/Layout';
import { Error } from 'components/Text';
import { InputText, Button } from 'components/Form';


import * as Routes from 'routes';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  font-size: ${p => p.theme.font.size.xxs};
  margin-top: ${p => p.theme.spacing.sm};
`;

const InputContainer = styled(Spacing)`
  width: 100%;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 1px;
`;

const ForgotPassword = styled.div`
  font-size: ${p => p.theme.font.size.xxs};
  margin-top: ${p => p.theme.spacing.xxs};
  color: ${p => p.theme.colors.white};
`;

/**
 * Sign In page
 */
const SignIn = ({ history, location }) => {
  const [values, setValues] = useState({ emailOrUsername: '', password: '' });
  const [error, setError] = useState('');




  const { emailOrUsername, password } = values;

  return (

        <form >
          <Root>
            <InputContainer>
              <InputText
                autoFocus
                type="text"
                name="emailOrUsername"
                values={emailOrUsername}
             //   onChange={handleChange}
                placeholder="Email or Username"
                borderColor="white"
              />
            </InputContainer>

            <InputContainer left="xs" right="xs">
              <InputText
                type="password"
                name="password"
                values={password}
             //   onChange={handleChange}
                placeholder="Password"
                borderColor="white"
              />

            </InputContainer>

            <Button>Log in</Button>
          </Root>
        </form>
  );
};

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  //refetch: PropTypes.func.isRequired,
};

export default withRouter(SignIn);
