// Redux
import {combineReducers} from 'redux';

// Actions types

// Actions Creators

const AppInitialState = {};

// Reducers
export function App ( state = AppInitialState, action ) {

  switch ( action.type ) {
  
    default:
      return state;
  }
};


export const reducers = combineReducers({
  App
});

export default reducers;
