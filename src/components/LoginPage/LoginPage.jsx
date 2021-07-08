import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Container from "@material-ui/core/Container";

function LoginPage() {
  const history = useHistory();

  return (
    <Container>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </Container>
  );
}

export default LoginPage;
