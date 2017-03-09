// Redux
import {combineReducers} from 'redux';

// Interfaces
import {IVideo} from '../interfaces';

// Actions types
export const USER_LOG_IN = 'USER_LOG_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const ADD_VIDEOS = 'ADD_VIDEOS';
export const TOGGLE_ADMIN_PANEL = 'TOGGLE_ADMIN_PANEL';

// Actions Creators
export function login ( username: string ) {
  return {
    type: USER_LOG_IN,
    username
  };
};

export function logout () {
  return {
    type: USER_LOG_OUT
  };
};

export function addVideos ( videos: Array<IVideo> ) {
  return {
    type: ADD_VIDEOS,
    videos
  };
};

function toggleAdminPanel() {
  return {
    type: TOGGLE_ADMIN_PANEL
  };
}

// Domain State
export interface IAppDomainState {
  username: string;
  toggleAdminPanel: boolean;
  videos: Array<IVideo>;
};

export interface IDomainState {
  App: IAppDomainState;
};

const AppInitialState: IAppDomainState = {
  username: '',
  toggleAdminPanel: false,
  videos: []
};


// Reducers
export function App ( state = AppInitialState, action ) {

  switch ( action.type ) {

    case USER_LOG_IN:
      return ({
        ...state,
        username: action.username
      });

    case USER_LOG_OUT:
      return ({
        ...state,
        username: ''
      });

    case TOGGLE_ADMIN_PANEL:
      return ({
        ...state,
        videos: !state.toggleAdminPanel
      });

    case ADD_VIDEOS:
      return ({
        ...state,
        videos: action.videos
      });
  
    default:
      return state;
  }
};


export const reducers = combineReducers({
  App
});

export default reducers;

// Redux Selectors
export function authenticated( state: IDomainState ): boolean {
  return state.App.username.length > 0;
}


