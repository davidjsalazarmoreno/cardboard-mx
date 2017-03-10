// React
import * as React from 'react';

// Interfaces
import {IPublicVideoFeedComponentProps} from '../public-video-feed/public-video-feed.component'

// HOC
import {ILoadingStateHOCOwnProps, LoadingStateHOC} from './../hoc/loading-state.hoc';

// Components
import {VideoAggregatorComponent} from '../video-aggregator/video-aggregator.component';

// Interfaces
import {IVideo} from '../../interfaces';

type TDirection = 'up' | 'down' | 'delete';

// Props
interface IAdminVideoFeedComponentProps extends IPublicVideoFeedComponentProps {
  onVideoSave: ( video: IVideo ) => Promise<boolean>; 
  onChangeVideoPosition?: ( index: number, direction: TDirection ) => Promise<boolean>;
};

// State
interface IAdminVideoFeedComponentState {};


@LoadingStateHOC()
export class AdminVideoFeedComponent extends React.Component<IAdminVideoFeedComponentProps & ILoadingStateHOCOwnProps, IAdminVideoFeedComponentState> {
  constructor(props) {
    super(props);
  }

  render () {
    // Props
    const { videos, onVideoSave, onChangeVideoPosition, toggleLoadingState } = this.props;

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
                  
                  <button 
                    type="button" 
                    onClick={() => {
                      event.preventDefault();

                      toggleLoadingState('Aumentando prioridad del video, espera');
                      onChangeVideoPosition( index, 'up' ).then((success) => {
                        toggleLoadingState('');

                      }).catch(error => {
                        console.log(error);
                        toggleLoadingState('Hubo un error al cambiar la posición del video');

                      });
                    }} 
                    disabled={index === 0}
                    >
                    Subir
                    <i className="fa fa-arrow-up"></i>
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={(event) => {
                      event.preventDefault();

                      toggleLoadingState('Disminuyendo prioridad del video, espera');
                      onChangeVideoPosition( index, 'down' ).then((success) => {
                        toggleLoadingState('');
            
                      }).catch(error => {
                        console.log(error);
                        toggleLoadingState('Hubo un error al cambiar la posición del video');
                      });
                    }} 
                    disabled={index === videos.length - 1}
                  >
                    Bajar
                    <i className="fa fa-arrow-down"></i>
                  </button>

                  <button 
                    type="button" 
                    onClick={(event) => {
                      event.preventDefault();

                      toggleLoadingState('Borrando video, espera');
                      onChangeVideoPosition( index, 'delete' ).then((success) => {
                        toggleLoadingState('');
            
                      }).catch(error => {
                        console.log(error);
                        toggleLoadingState('Hubo un error mientras se borraba el video.');
                      });
                    }}
                  >
                    Borrar
                    <i className="fa fa-trash"></i>
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
