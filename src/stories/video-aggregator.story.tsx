// React
import * as React from 'react';

// Storybook
import { storiesOf, action, module } from '@kadira/storybook';

// Components
import {VideoAggregatorComponent} from '../components/video-aggregator/video-aggregator.component';

/**
 * Youtube video pattern
 * Source: http://stackoverflow.com/questions/3717115/regular-expression-for-youtube-links
 */
const pattern = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

class Wrapper extends React.Component<any, any> {
  state = {
    isValidUrl: false,
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
    const { isValidUrl } = this.state;

    return (
      <VideoAggregatorComponent
        isAValidUrl={isValidUrl}
        onInputChange={event => {
          const target = event.target;
          const id: string = target.id;
          const value: string = event.target.value;

          this.setState({ 
            ...this.state, 
            currentVideo: {
              ...this.state.currentVideo,
              [id]: value 
            }
          });
        }}
        onAggregatorInputChange={event => {
          const target = event.target;
          const id: string = target.id;
          const value: string = event.target.value;
          const matches = value.match(pattern);

          if ( matches && matches.length > 0 ) {
            this.setState({ 
              ...this.state, 
              isValidUrl: true,
              currentVideo: {
                ...this.state.currentVideo,
                [id]: value 
              }
            });
            console.log(matches[1]);
            return;
          }

          this.setState({ ...this.state, isValidUrl: false });
          return;
          
        }}
        onSave={(event) => {
          event.preventDefault();
          
          
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
