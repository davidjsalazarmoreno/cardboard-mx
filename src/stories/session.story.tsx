// React
import * as React from 'react';

// Firebase
import * as firebase from 'firebase';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {SessionComponent} from '../components/session/session.component';

storiesOf('SessionComponent', module)
  .add('default view', () => (
    <div>
      <SessionComponent 
        onSave={(username, password) => {
          const authPromise = firebase.auth().signInWithEmailAndPassword(username, password);

          return new Promise((resolve, reject) => {
            authPromise.then((...args) => {
              console.log(args);

              return resolve(true);
            }).catch(error => {
              console.log(error);
              return reject(false);
            })

          });

        }}
      />
    </div>
  ))
