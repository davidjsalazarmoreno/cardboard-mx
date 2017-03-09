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
interface IAdminVideoFeedComponentState {};

export class AdminVideoFeedComponent extends React.Component<IAdminVideoFeedComponentProps, IAdminVideoFeedComponentState> {
  constructor(props) {
    super(props);
  }

  render () {
    // Props
    const { videos, onVideoSave } = this.props;

    return (
      <div className="AdminVideoFeedComponent">
        
        <VideoAggregatorComponent
          onSave={onVideoSave}
        />

        <hr/>
        <ul>
          {
            videos.map((video, index) => {
              return (
                <li key={index}>
                  {video.title}
                  
                  <button type="button" style={{display: index === 0 && 'none' }}>
                    Subir
                    <i className="fa fa-arrow-up"></i>
                  </button>
                  
                  <button type="button" style={{display: index === videos.length - 1 && 'none' }}>
                    Bajar
                    <i className="fa fa-arrow-down"></i>
                  </button>
                  
 
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
