// React
import * as React from 'react';

// Interfaces
import {IPublicVideoFeedComponentProps} from '../public-video-feed/public-video-feed.component'

// Components
import {VideoAggregatorComponent} from '../video-aggregator/video-aggregator.component';

// Interfaces
import {IVideo} from '../../interfaces';

// Props
interface IAdminVideoFeedComponentProps extends IPublicVideoFeedComponentProps {
  onVideoSave: ( video: IVideo ) => Promise<boolean>; 
};

// State
interface IAdminVideoFeedComponentState {
  isAggregatorVisible: boolean;
  isAValidUrl: boolean;
};

function toggleAggregator(state: IAdminVideoFeedComponentState, props: IAdminVideoFeedComponentProps) {
  return {
    isAggregatorVisible: !state.isAggregatorVisible
  };
}

export class AdminVideoFeedComponent extends React.Component<IAdminVideoFeedComponentProps, IAdminVideoFeedComponentState> {
  state = {
    isAggregatorVisible: false,
    isAValidUrl: false
  };

  constructor(props) {
    super(props);;
  }

  render () {
    // Props
    const { videos, onVideoSave } = this.props;

    // State
    const { isAggregatorVisible, isAValidUrl } = this.state;

    return (
      <div className="AdminVideoFeedComponent">
        {!isAggregatorVisible && <button type="button" onClick={() => {
          this.setState(toggleAggregator);
        }}>
          Agregar video
        </button>}

        {
          isAggregatorVisible && <button type="button" onClick={() => {
          this.setState(toggleAggregator);
        }}>
          Descartar
        </button>
        }

        {
          isAggregatorVisible && <VideoAggregatorComponent 
            onSave={onVideoSave}
          />
        }

        <hr/>
        <ul>
          {
            videos.map((video, index) => {
              return (
                <li key={index}>
                  {video.title}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
};

export default AdminVideoFeedComponent;
