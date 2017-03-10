// React
import * as React from 'react';

// HOC
import {LoadingStateHOC, ILoadingStateHOCOwnProps} from '../hoc/loading-state.hoc';

// Props
interface IVideoCommentsComponentProps {
  comments: Array<{
    name: string;
    comment: string;
  }>;
  onSave: ( comment: { name: string, comment: string } ) => Promise<boolean>; 
};

// State
interface IVideoCommentsComponentState {
  name: string;
  comment: string;
};

@LoadingStateHOC()
export class VideoCommentsComponent extends React.Component<IVideoCommentsComponentProps & ILoadingStateHOCOwnProps, IVideoCommentsComponentState> {
  state = {
    name: '',
    comment: ''
  };

  constructor(props) {
    super(props);

    // Event handlers
    this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
  }

  handleNewCommentChange( event ) {
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
    const { comments, loadingText, onSave } = this.props;

    // State 
    const { comment, name } = this.state;

    // Event handlers
    const { handleNewCommentChange } = this;

    return (
      <div className="VideoCommentsComponent">

        <h3>Comentarios</h3>

        <ul className="list-group">
          {
            comments ? comments.map(({name, comment}) => {
              return (
                <li className="list-group-item" key={name}>
                  <b>{name}</b>: {comment}
                </li>
              );
            }) : <li className="list-group-item">Sin comentarios, ¡sé el primero!</li>
          }
        </ul>

        <hr/>

        <form className="form" onSubmit={event => {
          event.preventDefault();

          this.props.toggleLoadingState('Agregando comentario, espera.');

          onSave({
            name,
            comment
          }).then(success => {
            this.props.toggleLoadingState('');

          }).catch(error => {
            console.log(error);
            this.props.toggleLoadingState('Hubo un error agregando el comentario, intenta de nuevo por favor.');

          });
        }}>
          <h3>Agregar comentario</h3>

          <label htmlFor="name">
            Nombre
          </label>
          <input className="form-control" id="name" type="text" onChange={handleNewCommentChange} required />


          <label htmlFor="comment">
            Comentario
          </label>
          <textarea className="form-control" id="comment" onChange={handleNewCommentChange} required></textarea>

          <p className="error-message">
            {loadingText}
          </p>

          <button className="btn btn-primary" type="submit">
            Agregar
          </button>
        </form>

      </div>
    )
  }
};

export default VideoCommentsComponent;
