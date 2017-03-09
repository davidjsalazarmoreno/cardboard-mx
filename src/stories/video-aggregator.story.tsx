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
    videos: []
  }

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.videos);
  }  

  render() {

    return (
      <VideoAggregatorComponent
        onSave={(video) => {
          console.log(video);
          const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              this.setState({
                ...this.state,
                videos: [ ...this.state.videos, video ]
              });
              resolve(true);
            }, 3000);
          });

          return promise;
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
