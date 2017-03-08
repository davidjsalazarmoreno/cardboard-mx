// React
import * as React from 'react';

// Props
interface IVideoAggregatorComponentProps {
  isAValidUrl: boolean;
  onInputChange: any;
  onAggregatorInputChange: any;
  onSave: any;
};

export function VideoAggregatorComponent ( props: IVideoAggregatorComponentProps ) {
  // Props
  const { isAValidUrl, onInputChange, onAggregatorInputChange, onSave } = props;

  return (
    <div className="VideoAggregatorComponent">
      <form onSubmit={onSave}>
        <label htmlFor="urlAggregator">
          Agrega tu enlace youtube
        </label>
        <input type="text" id="url" onChange={onAggregatorInputChange} maxLength={150} required />


        <label htmlFor="category">
          Categoría
        </label>
        <input type="text" id="category" onChange={onInputChange} disabled={!isAValidUrl} maxLength={150} required />
        
        <label htmlFor="title">
          Titulo
        </label>
        <input type="text" id="title" onChange={onInputChange} disabled={!isAValidUrl} maxLength={150} required />

        <label htmlFor="description">
          Descripción
        </label>
        <input type="text" id="description" onChange={onInputChange} disabled={!isAValidUrl} maxLength={150} required />

        {
          !isAValidUrl && <p>
            Por favor ingresa un enlace de youtube
          </p>
        }

        <button type="submit"disabled={!isAValidUrl}>
          Agregar enlace
        </button>
      </form>
    </div>
  );
};

export default VideoAggregatorComponent;
