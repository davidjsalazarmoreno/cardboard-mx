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
import {login, logout} from '../reducers/index';

// Containers
import PublicContainer from '../containers/public.container';
import AdminContainer from '../containers/admin.container';

// Components
import {SessionComponent} from '../components/session/session.component';


class MainContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MainContainer container">
        <SessionComponent 
          username={this.props.username}
          onSave={(username, password) => {
            const authPromise = firebase.auth().signInWithEmailAndPassword(username, password);

            return new Promise((resolve, reject) => {
              authPromise.then((...args) => {
                console.log(args);
                console.log(username);
                this.props.onLogin( username );

                return resolve(true);
              }).catch(error => {
                console.log(error);
                this.props.onLogout();

                return reject(false);
              })

            });
          }}
          onLogout={() => {
            const authPromise = firebase.auth().signOut();

            return new Promise((resolve, reject) => {
              authPromise.then((...args) => {
                console.log(args);

                this.props.onLogout();

                return resolve(true);
              }).catch(error => {
                console.log(error);
                this.props.onLogout();
                return reject(false);
              })

            });
          }}
        />

        <PublicContainer />

        <AdminContainer />
      </div>
    )
  }
}

const mapStateToProps = (state: IDomainState, ownProps) => {
  const { username } = state.App;
  return {
    username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: bindActionCreators( login, dispatch ),
    onLogout: bindActionCreators( logout, dispatch ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
