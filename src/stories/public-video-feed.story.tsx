// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {PublicVideoFeedComponent} from '../components/public-video-feed/public-video-feed.component';

const videos = [
  { 
    id: `${Math.random()}`, 
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
  }
];

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
