// React
import * as React from 'react';

// HOC
import {LoadingStateHOC, ILoadingStateHOCOwnProps} from '../hoc/loading-state.hoc';

// Props
interface IVideoPlayerComponentProps {
  url: string;
};

// State
interface IVideoPlayerComponentState {};

@LoadingStateHOC({ spinner: false })
export class VideoPlayerComponent extends React.Component<IVideoPlayerComponentProps & ILoadingStateHOCOwnProps, IVideoPlayerComponentState> {

  constructor(props) {
    super(props);
  }

   componentWillMount () {
    this.props.toggleLoadingState('Cargando reproductor, espera.');
  }
  

  render () {
    // Props
    const { url, isLoading, loadingText } = this.props;

    return (
      <div className="VideoPlayerComponent">
        {
          isLoading && <h2> {loadingText} <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> </h2>
        }
        <iframe 
          src={`${url}`} 
          width="640" 
          height="480" 
          frameBorder="0" 
          allowFullScreen
          onLoad={() => {
            if ( isLoading ) {
              console.info('Iframe onload');
              this.props.toggleLoadingState('');
            }
          }}
        >
        </iframe>
        {this.props.children}
      </div>
    )
  }
};

export default VideoPlayerComponent;
