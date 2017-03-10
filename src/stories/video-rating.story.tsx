// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoRatingComponent} from '../components/video-rating/video-rating.component';

// Utils
import {extractYoutubeId} from '../utils/index';


class Wrapper extends React.Component<any, any> {
  state = {
    up: 200,
    down: 15
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <VideoRatingComponent 
        count={this.state}
        onThumbClick={( upOrDown ) => {
          console.log(upOrDown);

          const promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
              const newState = ({
                ...this.state,
                [upOrDown]: this.state[ upOrDown ]++
              });

              this.setState(newState);

              resolve(true);
            }, 3000);
          });

          return promise;
        }}
      />
    </div>
    );
  }
}

storiesOf('VideoRatingComponent', module)
  .add('default view', () => (
    <Wrapper />
  ));
