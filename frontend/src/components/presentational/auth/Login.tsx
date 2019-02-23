import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Alert, Col, Row } from 'reactstrap';
import { ILoginPresentational } from '../../core/auth/IAuth';

const Login: FunctionComponent<ILoginPresentational> = (props: ILoginPresentational) => {
  const { submitForm, changeInput, state: { email, password, errors } } = props;
  return (
    <Row>
      <Col className="mt-5" md={{ size: 6, offset: 3 }}>
        {!errors.length ? null : errors.map((error, index) => (
          <Alert color="danger" key={ index }>
            <div>{error.msg}</div>
          </Alert>
        ))}
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter youe email address"
              value={email}
              onChange={changeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={changeInput}
            />
          </FormGroup>
          <div>You don't have an account? Create one <Link to="/register">here</Link></div>
          <Button>Login</Button>
        </Form>
      </Col>
    </Row>
  )
};

export default Login;