// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoAggregatorComponent} from '../components/video-aggregator/video-aggregator.component';

// Utils
import {extractYoutubeId} from '../utils/index';
class Wrapper extends React.Component<any, any> {
  state = {
    isAValidUrl: false,
    currentVideo: {
      title: '',
      description: '',
      url: '',
      category: ''
    },
    videos: []
  }

  constructor(props) {
    super(props);
  }

  render() {
    // State
    const { isAValidUrl } = this.state;

    return (
      <VideoAggregatorComponent
        onSave={(video) => {
          console.log(video);
          return new Promise((resolve, reject) => {
            resolve(true);
          });
        }}
      />
    )
  }
}


storiesOf('VideoAggregatorComponent', module)
  .add('default view', () => (
    <div>
      <Wrapper />
    </div>
  ))
