import React, {Component} from 'react';
import LoginController from './LoginController';
import store from './redux/store';
import {Provider} from 'react-redux';
import AppNavigator from './appNavigator';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
export default App;
