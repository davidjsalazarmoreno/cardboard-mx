// React
import * as React from 'react';

// React Lazy Load
const LazyLoad = require('react-lazyload').default;

// Components
import {VideoThumbnailComponent} from '../video-thumbnail/video-thumbnail.component';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import {VideoRatingComponent} from '../video-rating/video-rating.component';
import {VideoCommentsComponent} from '../video-comments/video-comments.component';

// Utils
import {extractYoutubeId} from '../../utils/index';

// Styles
import './public-video-feed.component.scss';

interface IPublicVideoFeedComponentProps {
  videos: Array<{
    type: string;
    url: string;
    title: string;
    description: string;
    category: string;
    comments: Array<{ name: string, comment: string }>,
    rating: { up: number, down: number };
  }>;
  onPlay: () => void;
  onBackToFeed: () => void;
};

interface IPublicVideoFeedComponentState {
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
    // State
    const { indexOfSelectedVideo } = this.state;

    const video = this.props.videos.filter((video, index) => index === indexOfSelectedVideo)[0];
    const url = video.type === "youtube" ? `https://www.youtube.com/embed/${extractYoutubeId( video.url )}` : video.url;
 
    return (
      <VideoPlayerComponent
        url={url}
      >
        <VideoRatingComponent 
          count={{ up: video.rating.up, down: video.rating.down }}
          onThumbClick={() => console.log('thumb')}
        />
        <VideoCommentsComponent 
          comments={video.comments}
          onSave={() => {
            const promise = new Promise((resolve, reject) => {
              resolve(true);
            });

            return promise;
          }}
        />
      </VideoPlayerComponent>
    );
  }

  render() {
    // Props
    const { videos, onPlay } = this.props;

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
                key={url}
                onClick={() => {
                  const newState = ({
                    ...this.state,
                    isPlaying: true,
                    indexOfSelectedVideo: index
                  });

                  this.setState(newState);
                  onPlay();
                }}
              >
                <VideoThumbnailComponent
                  id={url}
                  type={type}
                  alt={description}
                  url={extractYoutubeId( url )}
                  width="25%"
                  height="25%"
                  onClick={() => {}}
                />
                <b>
                  {title}
                </b>

                <br/>
                <b>Comments</b>: {comments.length}
                <br/>

                <b>Rating</b>:
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                <b>
                  {rating.up}
                </b>
                &nbsp;
                <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
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
