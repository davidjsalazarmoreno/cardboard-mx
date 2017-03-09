// Storybook
import { configure } from '@kadira/storybook';

// Firebase
import * as firebase from 'firebase';

// Font Awesome
import 'font-awesome/css/font-awesome.css';

// Normalize.css
import 'normalize.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCVjR3E5b7BFJZz_IyECaBGVE2wIxbjTUg",
  authDomain: "cardboard-dev-testing.firebaseapp.com",
  databaseURL: "https://cardboard-dev-testing.firebaseio.com",
  storageBucket: "cardboard-dev-testing.appspot.com",
  messagingSenderId: "120787421869"
};

firebase.initializeApp( config );

function loadStories() {
  require('../src/stories/video-player.story');
  require('../src/stories/video-aggregator.story');
  require('../src/stories/video-thumbnail.story');
  require('../src/stories/video-rating.story');
  require('../src/stories/public-video-feed.story');
  require('../src/stories/admin-video-feed.story');
  require('../src/stories/video-comment.story');
  require('../src/stories/session.story');
}

configure(loadStories, module);
