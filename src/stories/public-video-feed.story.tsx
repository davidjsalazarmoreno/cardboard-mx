// React
import * as React from 'react';

// Firebase
import * as firebase from 'firebase';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {PublicVideoFeedComponent} from '../components/public-video-feed/public-video-feed.component';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCVjR3E5b7BFJZz_IyECaBGVE2wIxbjTUg",
  authDomain: "cardboard-dev-testing.firebaseapp.com",
  databaseURL: "https://cardboard-dev-testing.firebaseio.com",
  storageBucket: "cardboard-dev-testing.appspot.com",
  messagingSenderId: "120787421869"
};

firebase.initializeApp( config );


const videos = [
  { 
    title: 'Preguntas de las que Nadie tiene las Respuestas (Versión completa)', 
    description: 'En la primera de una nueva serie de TED-Ed diseñada para catalizar la curiosidad, Chris Anderson curador de TED comparte sus obsesiones de la niñez con preguntas peculiares que parecen no tener respuestas. (Introducción de la serie "Preguntas de las que Nadie tiene las Respuestas)', 
    category: 'Educación', 
    type: 'youtube', 
    url: 'https://www.youtube.com/watch?v=7SWvDHvWXok',
    comments: [
      { name: 'foo', comment: 'lorem foo dolor' },
      { name: 'bar', comment: 'lorem bar dolor' },
      { name: 'baz', comment: 'lorem baz dolor' },
    ],
    rating: { up: 100, down: 1 }
  },
  { 
    title: 'Preguntas de las que Nadie tiene las Respuestas (Versión completa)', 
    description: 'En la primera de una nueva serie de TED-Ed diseñada para catalizar la curiosidad, Chris Anderson curador de TED comparte sus obsesiones de la niñez con preguntas peculiares que parecen no tener respuestas. (Introducción de la serie "Preguntas de las que Nadie tiene las Respuestas)', 
    category: 'Educación', 
    type: 'youtube', 
    url: 'https://www.youtube.com/watch?v=7yDmGnA8Hw0',
    comments: [
      { name: 'baz', comment: 'lorem baz dolor' },
      { name: 'bar', comment: 'lorem bar dolor' },
      { name: 'foo', comment: 'lorem foo dolor' },
    ],
    rating: { up: 10, down: 5 }
  },
];

const remoteVideosRef = firebase.database().ref('cardboard/');

remoteVideosRef.set({
  'videos': videos
})

class Wrapper extends React.Component<any,any> {
  state = {
    videos: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    remoteVideosRef.once('value').then((snapshot) => {
      console.log(snapshot.val());

      const remoteVideos = snapshot.val().videos;

      this.setState({ ...this.state, videos: remoteVideos })
    });
  }

  render() {
    return (
      <div>
        <PublicVideoFeedComponent
          videos={this.state.videos}
          onPlay={() => {
            console.log('play');
          }}
          onBackToFeed={() => {
            console.log('back to feed');
          }}
        />
      </div>
    );
  }
  
}

storiesOf('PublicVideoFeedComponent', module)
  .add('default view', () => (
    <div>
      <PublicVideoFeedComponent
        videos={videos}
        onPlay={() => {
          console.log('play');
        }}
        onBackToFeed={() => {
          console.log('back to feed');
        }}
      />
    </div>
  ))
  .add('videos from firebase', () => (
    <Wrapper />
  ))
