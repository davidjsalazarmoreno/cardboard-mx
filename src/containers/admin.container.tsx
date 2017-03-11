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
import {AdminVideoFeedComponent} from '../components/admin-video-feed/admin-video-feed.component';

// Utils
import {arrayUtils, env} from '../utils/index';

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
    return (
      <div className="PublicContainer">
        <h2>Panel de administración</h2>
        <AdminVideoFeedComponent 
          videos={this.props.videos}
          onVideoSave={video => {
            const videosWithTheNew = [ ...this.props.videos, video ];
            const remoteVideosRef = firebase.database().ref(`cardboard-${env()}/`);

            return new Promise((resolve, reject) => {

              remoteVideosRef.set({
                [`videos-${env()}`]: videosWithTheNew
              }).then((...args) => {
                console.log(args);
                this.props.addVideos( videosWithTheNew );
                resolve(true);

              }).catch(error => {
                console.log(error);
                resolve(false);
              });

            });
          }}
          onChangeVideoPosition={(index, direction) => {
            const length = this.props.videos.length - 1;
            const remoteVideosRef = firebase.database().ref(`cardboard-${env()}/`);

            return new Promise((resolve, reject) => {
              const rearrangedVideos = arrayUtils[ direction ]( index, this.props.videos );

              remoteVideosRef.set({
                [`videos-${env()}`]: rearrangedVideos
              }).then((...args) => {
                this.props.addVideos( rearrangedVideos );
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
