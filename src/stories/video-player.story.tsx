// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoPlayerComponent} from '../components/video-player/video-player.component';


storiesOf('VideoPlayerComponent', module)
  .add('default view', () => (
    <div>
      <VideoPlayerComponent 
      url={`https://www.youtube.com/embed/7SWvDHvWXok`}
      />
    </div>
  ))
