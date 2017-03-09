// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoRatingComponent} from '../components/video-rating/video-rating.component';

// Utils
import {extractYoutubeId} from '../utils/index';

storiesOf('VideoRatingComponent', module)
  .add('default view', () => (
    <div>
      <VideoRatingComponent 
        count={{
          up: 200,
          down: 15
        }}
        onThumbClick={( upOrDown ) => {
          console.log(upOrDown);

          const promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
          });

          return promise;
        }}
      />
    </div>
  ));
