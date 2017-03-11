// React
import * as React from 'react';

// Redux
import {bindActionCreators} from 'redux';

// React Redux
import { connect } from 'react-redux';

// Firebase
import * as firebase from 'firebase';

// Interfaces
import {IDomainState} from '../reducers/index';

// Actions creators
import {addVideos} from '../reducers/index';

// Components
import {PublicVideoFeedComponent} from '../components/public-video-feed/public-video-feed.component';

// Styles
import './public.container.scss';

// Utils
import {env} from '../utils/index';

class PublicContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const remoteVideosRef = firebase.database().ref(`cardboard-${env()}/`);

    remoteVideosRef.once('value').then((snapshot) => {
      console.log(snapshot.val()[`videos-${env()}`]);

      const remoteVideos = snapshot.val()[`videos-${env()}`];

      this.props.addVideos( remoteVideos );
    });
  }

  render() {
    // State to props
    const { videos } = this.props;

    return (
      <div className="PublicContainer">
        <h2>Videos</h2>

        {videos.length === 0 && 'Cargando videos, espera'}
        <PublicVideoFeedComponent 
          videos={videos}
          onRatingSave={( index, upOrDown ) => {
            const remoteVideosRef = firebase.database().ref(`cardboard-${env()}/`);
            const newState = ({
              ...this.state,
              videos: this.props.videos.map((video, idx) => {
                if ( index === idx ) {
                  const videoWithNewRating = ({
                    ...video,
                    rating: {
                      ...video.rating,
                      [upOrDown]: ++video.rating[upOrDown]
                    }
                  });

                  return videoWithNewRating;
                }

                return video;
              })
              
            });

            return new Promise((resolve, reject) => {
              remoteVideosRef.set({
                [`videos-${env()}`]: newState.videos
              }).then((...args) => {
                this.props.addVideos( newState.videos );
                resolve(true);

              }).catch(error => {
                console.log(error);
                resolve(false);

              });
            });


          }}
          onCommentSave={( index, comment ) => {
            const remoteVideosRef = firebase.database().ref(`cardboard-${env()}/`);
            const newState = ({
              ...this.state,
              videos: this.props.videos.map((video, idx) => {
                if ( index === idx ) {
                  const videoWithNewComment = ({
                    ...video,
                    comments: [ comment, ...video.comments ]
                  });

                  return videoWithNewComment;
                }

                return video;
              })
            });

            console.log(newState);

            return new Promise((resolve, reject) => {
              remoteVideosRef.set({
                [`videos-${env()}`]: newState.videos
              }).then((...args) => {
                this.props.addVideos( newState.videos );
                resolve(true);

              }).catch(error => {
                console.log(error);
                resolve(false);

              });
            });


          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: IDomainState, ownProps) => {
  const { videos } = state.App;
  return {
    videos
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addVideos: bindActionCreators( addVideos, dispatch )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicContainer)
