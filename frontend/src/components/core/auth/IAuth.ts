import { ReactElement } from 'react'


// Presentational components
export interface IAuthPresentational {
  submitForm: (e: { preventDefault: () => void; target: any; }) => void;
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ILoginPresentational extends IAuthPresentational {
  state: ILoginContainerState;
}

export interface IRegisterPresentational extends IAuthPresentational {
  state: IRegisterContainerState;
}


// Container props
export interface ILoginContainerProps {
  children: (props: ILoginPresentational) => ReactElement<ILoginPresentational>;
};

export interface IRegisterContainerProps {
  children: (props: IRegisterPresentational) => ReactElement<IRegisterPresentational>;
};

// User
export interface ILoginUser { 
  email: string;
  password: string;
}

export interface IRegisterUser extends ILoginUser {
  name: string;
  confirmPassword: string;
}

// State + Errors
export interface IRegisterContainerState extends IRegisterUser{
  errors: Array<{ msg: string }>;
}

export interface ILoginContainerState extends ILoginUser{
  errors: Array<{ msg: string }>;
}