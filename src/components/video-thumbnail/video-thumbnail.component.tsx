// React
import * as React from 'react';

// React Lazy Load
const LazyLoad = require('react-lazyload').default;

// Styles
import './video-thumbnail.component.scss';

interface IVideoThumbnailComponentProps {
  type: string;
  url: string;
  alt: string;
  id: string;
  width?: string;
  height?: string;
  onClick?: any;
};

interface IVideoThumbnailComponentState {};

export class VideoThumbnailComponent extends React.Component<IVideoThumbnailComponentProps, IVideoThumbnailComponentState> {
  constructor(props) {
    super(props);
  }  

  render() {
    // Props
    const { type, url, alt, id, onClick } = this.props;

    return(
      <div key={`${url}-${id}`} id={id} className="VideoThumbnailComponent" onClick={onClick}>
        <a 
          href={ type === 'youtube' ? `https://www.youtube.com/watch?v=${url}` : `${url}` } 
          className="Thumbnail" 
          onClick={(e) => {
            if ( type === 'youtube' && window.matchMedia('(max-width: 768px)').matches ) {
              return;
            }

            e.preventDefault();

          }}
          target="_blank"
        >
          <LazyLoad offset={100} placeholder={
            <div className="placeholder">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
          }>
            <img 
              src={ type === 'youtube' ? `http://img.youtube.com/vi/${url}/mqdefault.jpg` : `${url}` } 
              style={{
                width: this.props.width || '100%',
                height: this.props.height || '100%'
              }}   
            />
          
          </LazyLoad>
        </a>
        {/* /Thumbnail */}
      
      </div>
    );
  }
}


export default VideoThumbnailComponent;
