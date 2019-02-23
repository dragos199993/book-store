import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'reactstrap/lib/Container';
import MainRouter from '../../router/mainRouter';
import HeaderContainer, { IHeaderProps } from '../core/shared/HeaderContainer';
import Header from './shared/Header';

interface IAppState {
  items: Item[];
}

interface Item {
  name: string;
  value: number;
  _id: string;
}

class App extends Component<any, IAppState> {

  state: IAppState = {
    items: []
  }

  render() {
    return (
      <div className="App">

        <HeaderContainer>
          {(props: IHeaderProps) => <Header {...props} />}
        </HeaderContainer>

        <Container>
          <MainRouter />
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
