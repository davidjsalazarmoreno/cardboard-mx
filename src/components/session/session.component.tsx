// React
import * as React from 'react';

// HOC
import {LoadingStateHOC, ILoadingStateHOCOwnProps} from '../hoc/loading-state.hoc';

// Props
interface ISessionComponentProps {
  username: string;
  onSave: ( username, password ) => Promise<any>;
  onLogout: () => Promise<any>;
};

// State
interface ISessionComponentState {
  username: string;
  password: string;
};

@LoadingStateHOC()
export class SessionComponent extends React.Component<ISessionComponentProps & ILoadingStateHOCOwnProps, ISessionComponentState> {
  state = {
    username: '',
    password: ''
  };

  constructor(props) {
    super(props);


    // Event handlers
    this.handleInputChange = this.handleInputChange.bind(this);

    // Render methods
    this.renderUserCard = this.renderUserCard.bind(this);
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

  renderUserCard() {
    return (
      <div>
        Usuario: {this.props.username}
        <hr/>
        <button type="button" onClick={() => {
          this.props.onLogout();
        }}>Cerrar sesión</button>
      </div>
    )
  }

  render () {
    // Props
    const { loadingText, onSave, toggleLoadingState } = this.props;

    // State 
    const { username, password } = this.state;

    // Event handlers
    const { handleInputChange } = this;

    // Render events
    const { renderUserCard } = this;

    if ( this.props.username.length > 0 ) {
      return renderUserCard();
    }

    return (
      <div className="SessionComponent">

        <form onSubmit={event => {
          event.preventDefault();

          toggleLoadingState('Iniciando sesión');

          onSave( username, password ).then(success => {
            console.log(success);
            toggleLoadingState('');

          }).catch(error => {
            console.log(error);
            toggleLoadingState('Hubo un error al iniciar sesión, intenta de nuevo');
          });
        }}>
          <h3>
            Iniciar Sesión
          </h3>

          <label htmlFor="user">
            Usuario
          </label>
          <input id="username" type="email" onChange={handleInputChange} required />


          <label htmlFor="password">
            Contraseña
          </label>
          <input id="password" type="password" onChange={handleInputChange} required />

          <p>
            {loadingText}
          </p>

          <button type="submit">
            Aceptar
          </button>
        </form>

      </div>
    )
  }
};

export default SessionComponent;
