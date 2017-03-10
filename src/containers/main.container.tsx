// React
import * as React from 'react';

// Redux
import {bindActionCreators} from 'redux';

// React Redux
import { connect } from 'react-redux';

// Firebase
import * as firebase from 'firebase';

// Interfaces
import {IDomainState} from '../reducers/index';

// Actions creators
import {login, logout, toggleAdminPanel} from '../reducers/index';

// Containers
import PublicContainer from '../containers/public.container';
import AdminContainer from '../containers/admin.container';

// Components
import {SessionComponent} from '../components/session/session.component';

// Selectors
import {isAuthenticated, isAdminPanelVisible} from '../reducers/index';

class MainContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    // State to props
    const { isAuthenticated, isAdminPanelVisible } = this.props;

    // Dispatch to Props
    const { onLogin, onLogout, onToggleAdminPanel } = this.props;

    return (
      <div className="MainContainer container">
        <SessionComponent 
          username={this.props.username}
          onSave={(username, password) => {
            const authPromise = firebase.auth().signInWithEmailAndPassword(username, password);

            return new Promise((resolve, reject) => {
              authPromise.then((...args) => {
                console.log(username);
                onLogin( username );

                return resolve(true);
              }).catch(error => {
                console.log(error);
                onLogout();

                return reject(false);
              })

            });
          }}
          onLogout={() => {
            const authPromise = firebase.auth().signOut();

            return new Promise((resolve, reject) => {
              authPromise.then((...args) => {
                console.log(args);

                onLogout();

                return resolve(true);
              }).catch(error => {
                console.log(error);
                onLogout();
                return reject(false);
              })

            });
          }}
        />

        {
          isAuthenticated && <a href="#" onClick={(event) => {
            event.preventDefault();

            onToggleAdminPanel();
          }}>
            { !isAdminPanelVisible && 'Panel de administración' }
            { isAdminPanelVisible && 'Lista pública de videos' }
          </a>
        }
        

        { !isAdminPanelVisible && <PublicContainer /> }
        { (isAuthenticated &&  isAdminPanelVisible) && <AdminContainer /> }
      </div>
    )
  }
}

const mapStateToProps = (state: IDomainState, ownProps) => {
  const { username } = state.App;
  return {
    username,
    isAdminPanelVisible: isAdminPanelVisible(state),
    isAuthenticated: isAuthenticated( state )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleAdminPanel: bindActionCreators( toggleAdminPanel, dispatch ),
    onLogin: bindActionCreators( login, dispatch ),
    onLogout: bindActionCreators( logout, dispatch ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
