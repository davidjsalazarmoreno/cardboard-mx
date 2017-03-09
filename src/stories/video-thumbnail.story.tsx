// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoThumbnailComponent} from '../components/video-thumbnail/video-thumbnail.component';

// Utils
import {extractYoutubeId} from '../utils/index';

const id = extractYoutubeId('https://www.youtube.com/watch?v=7SWvDHvWXok');

storiesOf('VideoThumbnailComponent', module)
  .add('default view', () => (
    <div>
      <VideoThumbnailComponent 
        id="VideoThumbnailComponent"
        width="30%"
        height="30%"
        url={id}
        type="youtube"
        alt="Comment"
      />
    </div>
  ))
