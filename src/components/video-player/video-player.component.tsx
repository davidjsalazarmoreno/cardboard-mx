// React
import * as React from 'react';

// Props
interface IVideoPlayerComponentProps {
  url: string;
};

// State
interface IVideoPlayerComponentState {
  isLoading: boolean;
};

export class VideoPlayerComponent extends React.Component<IVideoPlayerComponentProps, IVideoPlayerComponentState> {
  state = {
    isLoading: true
  };

  render () {
    // Props
    const { url } = this.props;

    // State 
    const { isLoading } = this.state;

    return (
      <div className="VideoPlayerComponent">
        {
          isLoading && <h2>
            Cargando reproductor, espera.
          </h2>
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
              const newState = { ...this.state, isLoading: false };
              this.setState( newState );    
            }
          }}
        >
        </iframe>
      </div>
    )
  }
};

export default VideoPlayerComponent;
