// React
import * as React from 'react';

// Store
import { Provider } from 'react-redux'

// Redux
import {createStore} from 'redux';

// Reducers
import {reducers} from './reducers/index';

// Containers
import MainContainer from './containers/main.container';

const store = createStore( 
  reducers, 
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export function Root() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default Root;
