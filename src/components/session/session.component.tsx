// React
import * as React from 'react';

// Props
interface ISessionComponentProps {
  onSave: ( username, password ) => Promise<any>;
};

// State
interface ISessionComponentState {
  isLogged: boolean;
  isLoading: boolean;
  username: string;
  password: string;
};

export class SessionComponent extends React.Component<ISessionComponentProps, ISessionComponentState> {
  state = {
    isLogged: false,
    isLoading: false,
    username: '',
    password: ''
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
    const { onSave } = this.props;

    // State 
    const { username, password } = this.state;

    // Event handlers
    const { handleInputChange } = this;

    return (
      <div className="SessionComponent">

        <form onSubmit={event => {
          event.preventDefault();

          onSave( username, password ).then(success => {
            console.log(success);
          }).catch(error => {
            console.log(error);
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

          <button type="submit">
            Iniciar sesión
          </button>
        </form>

      </div>
    )
  }
};

export default SessionComponent;
