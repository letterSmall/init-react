import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './store'
import { Provider } from 'react-redux'
import Common from './scenes/common'

import './mock'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path='/' component={Common}></Route>
          </Switch>
        </HashRouter>
      </Provider>
    );
  }

}

export default App;
