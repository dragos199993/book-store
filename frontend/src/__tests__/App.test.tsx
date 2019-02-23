import { shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/presentational/App';

describe('<App />', () => {
  test('renders without crashing', () => {
    const app = shallow(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(app).toMatchSnapshot();
  });
});
