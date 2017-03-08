import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/stories/video-player.story.tsx');
  require('../src/stories/video-aggregator.story.tsx');
}

configure(loadStories, module);
