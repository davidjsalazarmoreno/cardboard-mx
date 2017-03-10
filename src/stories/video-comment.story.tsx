// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoCommentsComponent} from '../components/video-comments/video-comments.component';


class Wrapper extends React.Component<any, any> {
  state = {
    comments: [
      { name: 'foo', comment: 'lorem foo dolor' },
      { name: 'bar', comment: 'lorem bar dolor' },
      { name: 'baz', comment: 'lorem baz dolor' },
    ]
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <VideoCommentsComponent 
          comments={this.state.comments}
          onSave={( comment ) => {
            const promise = new Promise((resolve, reject) => {
              setTimeout(() => {
                const comments = [ comment, ...this.state.comments ]

                this.setState({
                  ...this.state,
                  comments
                });

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

storiesOf('VideoCommentsComponent', module)
  .add('default view', () => (
    <Wrapper />
  ))
