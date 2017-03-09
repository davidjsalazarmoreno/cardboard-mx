// React
import * as React from 'react';

// Props
interface IVideoCommentsComponentProps {
  comments: Array<{
    name: string;
    comment: string;
  }>;
  onSave: ( comment ) => Promise<boolean>; 
};

// State
interface IVideoCommentsComponentState {
  isLoading: boolean;
  name: string;
  comment: string;
};

export class VideoCommentsComponent extends React.Component<IVideoCommentsComponentProps, IVideoCommentsComponentState> {
  state = {
    isLoading: true,
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
    const { comments, onSave } = this.props;

    // State 
    const { isLoading, comment, name  } = this.state;

    // Event handlers
    const { handleNewCommentChange } = this;

    return (
      <div className="VideoCommentsComponent">

        <h3>Comentarios</h3>

        <ul>
          {
            comments.map(({name, comment}) => {
              return (
                <li>
                  <b>name</b>: {comment}
                </li>
              );
            })
          }
        </ul>

        <hr/>

        <form onSubmit={event => {
          event.preventDefault();

          onSave({
            name,
            comment
          });
        }}>
          <h3>Agregar comentario</h3>

          <label htmlFor="name">
            Nombre
          </label>
          <input id="name" type="text" onChange={handleNewCommentChange} required />


          <label htmlFor="comment">
            Nombre
          </label>
          <textarea id="comment" onChange={handleNewCommentChange} required></textarea>

          <button type="submit">
            Agregar
          </button>
        </form>

      </div>
    )
  }
};

export default VideoCommentsComponent;
