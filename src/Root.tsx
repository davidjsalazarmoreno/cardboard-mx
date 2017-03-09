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

// Firebase
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCVjR3E5b7BFJZz_IyECaBGVE2wIxbjTUg",
  authDomain: "cardboard-dev-testing.firebaseapp.com",
  databaseURL: "https://cardboard-dev-testing.firebaseio.com",
  storageBucket: "cardboard-dev-testing.appspot.com",
  messagingSenderId: "120787421869"
};

firebase.initializeApp( config );

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
