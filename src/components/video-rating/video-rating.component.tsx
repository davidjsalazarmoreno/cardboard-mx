// React
import * as React from 'react';

// HOC
import {LoadingStateHOC, ILoadingStateHOCOwnProps} from '../hoc/loading-state.hoc';

// Styles
import './video-rating.component.scss';

type TUpOrDown = 'up' | 'down';

interface IVideoRatingComponentProps {
  count: {
    up: number,
    down: number;
  };
  onThumbClick: ( upOrDown: TUpOrDown ) => Promise<boolean>;
};

interface IVideoRatingComponentState {};

@LoadingStateHOC()
export class VideoRatingComponent extends React.Component<IVideoRatingComponentProps & ILoadingStateHOCOwnProps, IVideoRatingComponentState> {

  constructor(props) {
    super(props);

    // Events handlers
    this.handleThumbClick = this.handleThumbClick.bind(this);
  }

  handleThumbClick( event ) {
    // Props
    const { count, onThumbClick, toggleLoadingState } = this.props;

    // Dataset
    const dataThumb = event.currentTarget.dataset.thumb;

    toggleLoadingState('Guardando puntaje');

    onThumbClick( dataThumb ).then(success => {
      this.props.toggleLoadingState('');

    }).catch(error => {
      console.log(error);
      this.props.toggleLoadingState('Hubo un error guardando el puntaje, intenta de nuevo por favor.');

    });
  }

  render() {
    // Props
    const { count } = this.props;
    
    // Events handlers
    const { handleThumbClick } = this;

    return(
      <div className="VideoRatingComponent">
        <form>

          <button type="button" data-thumb="up" onClick={handleThumbClick}>
            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
            <b>
              {count.up}
            </b>
          </button>
          {/* /Up vote */}

          <button type="button" data-thumb="down" onClick={handleThumbClick}>
            <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
            <b>
              {count.down}
            </b>
          </button>
          {/* /Down vote */}


        </form>
      </div>
    );
  }
}


export default VideoRatingComponent;
