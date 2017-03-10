// React
import * as React from 'react';

// React Lazy Load
const LazyLoad = require('react-lazyload').default;

// Interfaces
import {IVideo} from '../../interfaces';

// Components
import {VideoThumbnailComponent} from '../video-thumbnail/video-thumbnail.component';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import {VideoRatingComponent} from '../video-rating/video-rating.component';
import {VideoCommentsComponent} from '../video-comments/video-comments.component';

// Utils
import {extractYoutubeId} from '../../utils/index';

// Styles
import './public-video-feed.component.scss';

export interface IPublicVideoFeedComponentProps {
  videos: Array<IVideo>;
  onCommentSave?: ( index, comment ) => Promise<boolean>;
  onRatingSave?: ( index, upOrDown ) => Promise<boolean>;
};

export interface IPublicVideoFeedComponentState {
  isPlaying: boolean;
  indexOfSelectedVideo: number;
};

export class PublicVideoFeedComponent extends React.Component<IPublicVideoFeedComponentProps, IPublicVideoFeedComponentState> {
  state = {
    isPlaying: false,
    indexOfSelectedVideo: -1
  };

  constructor(props) {
    super(props);

    // Render methods
    this.renderVideoPlayer = this.renderVideoPlayer.bind(this);
  }

  renderVideoPlayer() {
    // Props
    const { onCommentSave, onRatingSave } = this.props;

    // State
    const { indexOfSelectedVideo } = this.state;

    const video = this.props.videos.filter((video, index) => index === indexOfSelectedVideo)[0];
    const url = video.type === "youtube" ? `https://www.youtube.com/embed/${extractYoutubeId( video.url )}` : video.url;
 
    return (
      <div>
        <button className="btn btn-warning" type="button" onClick={() => {
          this.setState({
            ...this.state,
            indexOfSelectedVideo: -1,
            isPlaying: false
          });
        }}>
          Volver
        </button>

        <hr/>
        
        <VideoPlayerComponent
          url={url}
        >
          <VideoRatingComponent 
            count={{ up: video.rating.up, down: video.rating.down }}
            onThumbClick={( upOrDown ) => {
              return onRatingSave( indexOfSelectedVideo, upOrDown );
            }}
          />

          <VideoCommentsComponent 
            comments={video.comments}
            onSave={( comment ) => {
              return onCommentSave( indexOfSelectedVideo, comment );
            }}
          />
        </VideoPlayerComponent>
      </div>
    );
  }

  render() {
    // Props
    const { videos } = this.props;

    // State
    const { isPlaying } = this.state;

    // Render methods
    const { renderVideoPlayer } = this;
    
    if ( isPlaying ) {
      return renderVideoPlayer();
    }

    return (
      <div className="PublicVideoFeedComponent">
        {
          videos.map((video, index) => {
            const { category, 
                    description, 
                    title, 
                    type, 
                    url, 
                    comments,
                    rating } = video;

            return (
              <div 
                key={`${url}-${index}`}
                onClick={() => {
                  const newState = ({
                    ...this.state,
                    isPlaying: true,
                    indexOfSelectedVideo: index
                  });

                  this.setState(newState);
                }}
              >
                <VideoThumbnailComponent
                  id={url}
                  type={type}
                  alt={description}
                  url={extractYoutubeId( url )}
                  width="300"
                  onClick={() => {
                    const newState = ({
                      ...this.state,
                      isPlaying: true,
                      indexOfSelectedVideo: index
                    });

                    this.setState(newState);
                  }}
                />
                <b>
                  {title}
                </b>

                <br/>
                <b>Comentarios</b>: {comments ? comments.length : 0}
                <br/>

                <b>Rating</b>:
                <i className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></i>
                <b>
                  {rating.up}
                </b>

                &nbsp;

                <i className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></i>
                <b>
                  {rating.down}
                </b>
              </div>
            );
          })
        }

      </div>
    );
  }
}


export default PublicVideoFeedComponent;
