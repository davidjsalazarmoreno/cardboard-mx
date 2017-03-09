// React
import * as React from 'react';

// HOC
import {LoadingStateHOC, ILoadingStateHOCOwnProps} from '../hoc/loading-state.hoc';

// Utils
import {extractYoutubeId} from '../../utils/index';

// Interfaces
import {IVideo} from '../../interfaces';

// Props
interface IVideoAggregatorComponentProps {
  onSave: ( video: IVideo ) => Promise<boolean>; 
};

// Props
interface IVideoAggregatorComponentState {
  title: string;
  url: string; 
  category: string; 
  description: string; 
};

@LoadingStateHOC()
export class VideoAggregatorComponent extends React.Component<IVideoAggregatorComponentProps & ILoadingStateHOCOwnProps, IVideoAggregatorComponentState> {
  state = {
    title: '',
    url: '',
    category: '',
    description: ''
  };

  constructor(props) {
    super(props);

    // Event handlers
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange( event ) {
    const target = event.target;
    const id: string = target.id;
    const value: string = event.target.value;

    this.setState({
      ...this.state,
      [id]: value
    });

  }

  render () {
    // Props
    const { onSave, isLoading, loadingText, toggleLoadingState } = this.props;

    // State 
    const { title, url, category, description } = this.state;

    // Event handlers
    const { handleInputChange } = this;

    const isAValidUrl = extractYoutubeId( url ).length === 0 ? false : true;

    return (
      <div className="VideoAggregatorComponent">
        <form onSubmit={(event) => {
          event.preventDefault();

          toggleLoadingState('Agregando enlace, por favor espera.');

          onSave({
            title,
            url,
            category,
            description,
            type: 'youtube',
            rating: { up: 0, down: 0 }
          }).then(success => {
            toggleLoadingState('');
            console.log(success);

          }).catch(error => {
            toggleLoadingState('Hubo un error agregando el enlace, por favor intenta de nuevo.');
            console.log(error);

          })
        }}>
          <label htmlFor="urlAggregator">
            Agrega tu enlace youtube
          </label>
          <input type="text" id="url" onChange={handleInputChange} maxLength={150} required />

          <label htmlFor="title">
            Titulo
          </label>
          <input type="text" id="title" onChange={handleInputChange} disabled={!isAValidUrl} maxLength={150} required />

          <label htmlFor="description">
            Descripción
          </label>
          <input type="text" id="description" onChange={handleInputChange} disabled={!isAValidUrl} maxLength={150} required />

          <label htmlFor="category">
            Categoría
          </label>
          <input type="text" id="category" onChange={handleInputChange} disabled={!isAValidUrl} maxLength={150} required />
          
          {
            !isAValidUrl && <p>
              Por favor ingresa un enlace de youtube
            </p>
          }

          <p className="error">
            {loadingText}
          </p>

          <button type="submit" disabled={!isAValidUrl}>
            Agregar enlace
          </button>
        </form>
      </div>
    )
  }
};

export default VideoAggregatorComponent;

