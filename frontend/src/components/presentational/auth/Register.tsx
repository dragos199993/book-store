import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Alert, Col, Row } from 'reactstrap';
import { IRegisterPresentational } from '../../core/auth/IAuth';

const Register: FunctionComponent<IRegisterPresentational> = (props: IRegisterPresentational) => {
  const { submitForm, changeInput, state: { name, email, password, confirmPassword, errors } } = props;
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
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter youe name"
              value={name}
              onChange={changeInput}
            />
          </FormGroup>
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
          <FormGroup>
            <Label for="password">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={changeInput}
            />
          </FormGroup>
          <div>You don't have an account? Create one <Link to="/login">here</Link></div>
          <Button>Register</Button>
        </Form>
      </Col>
    </Row>
  )
};

export default Register;