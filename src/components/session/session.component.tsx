// React
import * as React from 'react';

// HOC
import {LoadingStateHOC, ILoadingStateHOCOwnProps} from '../hoc/loading-state.hoc';

// Styles
import './session.component.scss';

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
      <div className="SessionComponent navbar-form navbar-right">
        <span className="username">
          Usuario: {this.props.username}
        </span>
        <button className="btn btn-danger" type="button" onClick={() => {
          this.props.onLogout();
        }}>
          Cerrar sesión
        </button>
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
      <form className="SessionComponent navbar-form navbar-right" onSubmit={event => {
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

        <div className="form-group">
          <input className="form-control" id="username" type="email" placeholder="Usuario" onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <input className="form-control" id="password" type="password" placeholder="Contraseña" onChange={handleInputChange} required />
        </div>       


        <button type="submit" className="btn btn-success">
          Iniciar Sesión
        </button>
        <span>
          {loadingText}
        </span>
      </form>
    );
  }
};

export default SessionComponent;
