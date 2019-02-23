import React, { Component, ReactNode } from 'react'
import { Redirect } from 'react-router';
import { ILoginContainerProps, ILoginContainerState, ILoginUser } from '../IAuth';

export default class Login extends Component<ILoginContainerProps, ILoginContainerState> {

  state: ILoginContainerState = {
    email: '',
    password: '',
    errors: []
  }


  submitForm = (e: { preventDefault: () => void; target: HTMLElement; }) => {
    e.preventDefault();

    const { email, password } = this.state;
  }

  changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    } as { [K in keyof ILoginUser]: ILoginUser[K] });
  };

  render(): ReactNode {

    const { children } = this.props;
    const { submitForm, changeInput, state } = this;

    return (
      children({
        submitForm,
        changeInput,
        state
      })
    )
  }
}
