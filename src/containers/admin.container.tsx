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

class PublicContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const remoteVideosRef = firebase.database().ref('cardboard/');

    remoteVideosRef.once('value').then((snapshot) => {
      console.log(snapshot.val());

      const remoteVideos = snapshot.val().videos;

      this.props.addVideos( remoteVideos );
    });
  }

  render() {
    return (
      <div className="PublicContainer">
        <AdminVideoFeedComponent 
          videos={this.props.videos}
          onVideoSave={video => {
            const videosWithTheNew = [ ...this.props.videos, video ];

            return new Promise((resolve, reject) => {
              const remoteVideosRef = firebase.database().ref('cardboard/');

              remoteVideosRef.set({
                'videos': videosWithTheNew
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
