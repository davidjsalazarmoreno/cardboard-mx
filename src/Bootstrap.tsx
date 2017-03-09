// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Root Component
import {Root} from './Root';

(window as any).addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );

});
