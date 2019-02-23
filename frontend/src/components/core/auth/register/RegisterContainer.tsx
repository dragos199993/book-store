import { Component, ReactNode } from 'react'
import { IRegisterContainerProps, IRegisterContainerState, IRegisterUser } from '../IAuth';

export default class Login extends Component<IRegisterContainerProps, IRegisterContainerState> {

  state: IRegisterContainerState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  submitForm = (e: { preventDefault: () => void; target: HTMLElement; }) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = this.state;

  }

  changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    } as { [K in keyof IRegisterUser]: IRegisterUser[K] });
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
