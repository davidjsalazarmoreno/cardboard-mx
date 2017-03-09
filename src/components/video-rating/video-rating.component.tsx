// React
import * as React from 'react';

// React Lazy Load
const LazyLoad = require('react-lazyload').default;

// Components
import {VideoPlayerComponent} from '../video-player/video-player.component';

// Styles
import './video-rating.component.scss';

interface IVideoRatingComponentProps {
  count: {
    up: number,
    down: number;
  };
  onThumbClick: ( upOrDown: string ) => void;
};

interface IVideoRatingComponentState {

};

export class VideoRatingComponent extends React.Component<IVideoRatingComponentProps, IVideoRatingComponentState> {

  constructor(props) {
    super(props);

    // Events handlers
    this.handleThumbClick = this.handleThumbClick.bind(this);
  }

  handleThumbClick( event ) {
    // Props
    const { count, onThumbClick } = this.props;

    // Dataset
    const dataThumb: string = event.currentTarget.dataset.thumb;

    onThumbClick( dataThumb );
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
