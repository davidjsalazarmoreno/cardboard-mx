// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoCommentsComponent} from '../components/video-comments/video-comments.component';


storiesOf('VideoCommentsComponent', module)
  .add('default view', () => (
    <div>
      <VideoCommentsComponent 
        comments={[
          { name: 'foo', comment: 'lorem foo dolor' },
          { name: 'bar', comment: 'lorem bar dolor' },
          { name: 'baz', comment: 'lorem baz dolor' },
        ]}
        onSave={() => {
          const promise = new Promise((resolve, reject) => {
            resolve(true);
          });

          return promise;
        }}
      />
    </div>
  ))
