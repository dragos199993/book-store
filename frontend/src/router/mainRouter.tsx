import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginContainer from '../components/core/auth/login/LoginContainer';
import RegisterContainer from '../components/core/auth/register/RegisterContainer';
import BookList from '../components/core/BookContainer/BookList';
import LoginPresentational from '../components/presentational/auth/Login';
import RegisterPresentational from '../components/presentational/auth/Register';

const Login = () => (
  <LoginContainer>
    { (props) => <LoginPresentational { ...props } />}
  </LoginContainer>
) 


const Register = () => (
  <RegisterContainer>
    { (props) => <RegisterPresentational { ...props } />}
  </RegisterContainer>
) 

const MainRouter = () => (
  <Switch>
    <Route path="/login" component={ Login } />
    <Route path="/register" component={ Register } />
    <Route path="/" component={ BookList } />
  </Switch>
);

export default MainRouter