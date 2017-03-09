// React
import * as React from 'react';

// Firebase
import * as firebase from 'firebase';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Interfaces
import {IVideo} from '../interfaces';

// Components
import {AdminVideoFeedComponent} from '../components/admin-video-feed/admin-video-feed.component';

const videos: Array<IVideo> = [
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
    title: '¿Puedes resolver el enigma del puente? - Alex Gendler', 
    description: 'Ir de prácticas a un laboratorio en plena montaña a lo mejor no fue la mejor idea.. Tirar de la palanca marcada con el símbolo de una calavera solo para ver qué pasa, probablemente tampoco fue muy inteligente,. Pero ahora no es el momento para lamentarse porque hay que alejarse de estos zombies mutantes... rápidamente. ¿Se puede usar la matemática para cruzar el puente junto a tus amigos antes de que lleguen los zombis? Alex Gendler muestra cómo hacerlo.', 
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

class Wrapper extends React.Component<any,any> {
  state = {
    videos: []
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AdminVideoFeedComponent
          videos={this.state.videos}
          onVideoSave={(video) => {
            console.log(video);
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                this.setState({
                ...this.state,
                videos: [ ...this.state.videos, video ]
              });

              resolve(true);
              }, 3000);
            });
          }}
        />
      </div>
    );
  }
  
}
class WrapperFirebase extends React.Component<any,any> {
  state = {
    videos: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    remoteVideosRef.once('value').then((snapshot) => {
      const remoteVideos = snapshot.val().videos;

      this.setState({ ...this.state, videos: remoteVideos })
    });
  }

  render() {
    return (
      <div>
        <AdminVideoFeedComponent
          videos={this.state.videos}
          onVideoSave={video => {
            const videosWithTheNew = [ ...this.state.videos, video ];
            return new Promise((resolve, reject) => {
              console.log(videos);

              remoteVideosRef.set({
                'videos': videosWithTheNew
              }).then((...args) => {
                console.log(args);
                this.setState({
                  ...this.state,
                  videos: videosWithTheNew
                })
                resolve(true);

              }).catch(error => {
                console.log(error);
                resolve(false);
              });

            });
          }}
        />
      </div>
    );
  }
  
}

storiesOf('AdminVideoFeedComponent', module)
  .add('default view', () => (
    <Wrapper />
  ))
  .add('video list from firebase', () => (
    <WrapperFirebase />
  ))
