// React
import * as React from 'react';

// Firebase
import * as firebase from 'firebase';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {SessionComponent} from '../components/session/session.component';
class Wrapper extends React.Component<any, any> {
  state = {
    username: ''
  }

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <SessionComponent
        username={this.state.username}
        onSave={(username, password) => {
          const authPromise = firebase.auth().signInWithEmailAndPassword(username, password);

          return new Promise((resolve, reject) => {
            authPromise.then((...args) => {
              console.log(args);

              this.setState({
                ...this.state,
                username
              })

              return resolve(true);
            }).catch(error => {
              console.log(error);
              this.setState({
                ...this.state,
                username: ''
              })
              return reject(false);
            })

          });
        }}
        onLogout={() => {
          const authPromise = firebase.auth().signOut();

          return new Promise((resolve, reject) => {
            authPromise.then((...args) => {
              console.log(args);

              this.setState({
                ...this.state,
                username: ''
              });

              return resolve(true);
            }).catch(error => {
              console.log(error);
              return reject(false);
            })

          });
        }}
      />
    )
  }
}

storiesOf('SessionComponent', module)
  .add('default view', () => (
    <div>
      <Wrapper />
    </div>
  ))
