import React, { Component, ReactElement, ReactNode } from 'react'

export interface IHeaderProps {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
}

export interface IHeaderContainerState {
  isNavbarOpen: boolean;
}

export interface IHeaderContainerProps {
  children: (props: IHeaderProps) => ReactElement<IHeaderProps>;
}

export default class HeaderContainer extends Component<IHeaderContainerProps, IHeaderContainerState> {

  state = {
    isNavbarOpen: false
  };

  toggleNavbar = () => {
    this.setState({
      isNavbarOpen: !this.state.isNavbarOpen
    });
  }

  render(): ReactNode {
    const { isNavbarOpen } = this.state;
    const { children } = this.props;
    const { toggleNavbar } = this;
    return (
      children({ isNavbarOpen, toggleNavbar })
    )
  }
}
