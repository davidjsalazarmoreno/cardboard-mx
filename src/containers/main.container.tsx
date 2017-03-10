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

// Styles
import './main.container.scss';

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
      <div className="MainContainer">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">CardBoardMX DevTesting</a>
            </div>

            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {
                  isAuthenticated && <li href="#" onClick={(event) => {
                    event.preventDefault();

                    onToggleAdminPanel();
                  }}>
                    <a href="#">
                      { !isAdminPanelVisible && 'Panel de administración' }
                      { isAdminPanelVisible && 'Lista pública de videos' }
                    </a>
                  </li>
                }
              </ul>

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
            </div>

          </div>
        </nav>

      <div className="MainContainer container">
          { !isAdminPanelVisible && <PublicContainer /> }
          { (isAuthenticated &&  isAdminPanelVisible) && <AdminContainer /> }
        </div>
      </div>
    );
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
