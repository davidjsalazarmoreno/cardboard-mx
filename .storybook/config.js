import { configure } from '@kadira/storybook';

// Font Awesome
import 'font-awesome/css/font-awesome.css';

// Normalize.css
import 'normalize.css';

function loadStories() {
  require('../src/stories/video-player.story');
  require('../src/stories/video-aggregator.story');
  require('../src/stories/video-thumbnail.story');
  require('../src/stories/video-rating.story');
  require('../src/stories/public-video-feed.story');
  require('../src/stories/video-comment.story');
}

configure(loadStories, module);
