// React
import * as React from 'react';

export interface ILoadingStateHOCOwnProps {
  isLoading?: boolean;
  loadingText?: string;
  toggleLoadingState?: ( text?: string ) => void;
  setLoadingText?: ( text?: string ) => void;
};

export interface ILoadingStateHOCState {
  isLoading: boolean;
  loadingText?: string;
};

/**
 * HOC for get/set local loading state (ES7 Decorator)
 * 
 * @export
 * @returns
 */
export function LoadingStateHOC( options: { spinner: boolean } = { spinner: true } ) {
  return function ( ComponentToDecorate ): any {
    return class extends React.Component<any, ILoadingStateHOCState> {
      state = {
        isLoading: false,
        loadingText: ''
      };

      constructor(props) {
        super(props);

        // State getters/setters
        this.toggleLoadingState = this.toggleLoadingState.bind(this);
        this.setLoadingText = this.setLoadingText.bind(this);
      }

      toggleLoadingState( text = '' ): void {
        // State
        const state = this.state;

        const newState = ({
          ...state,
          isLoading: !state.isLoading,
          loadingText: text
        });

        this.setState(newState);

      }

      setLoadingText( text = '' ): void {
        // State
        const state = this.state;

        const newState = ({
          ...state,
          loadingText: text
        });

        this.setState(newState);
      }

      render() {
        // State
        const { isLoading, loadingText } = this.state;

        // State getters/setters
        const { toggleLoadingState, setLoadingText } = this;

        // HOC Props
        const props = {
          isLoading,
          loadingText,
          toggleLoadingState,
          setLoadingText
        };

        if ( isLoading && options.spinner === true ) {
          return (
            <div className="LoadingStateHOC">
              <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
              <b>
                {loadingText}
              </b>
            </div>
          );
        }

        return (
          <ComponentToDecorate {...this.props} {...props} />
        );
      }
    };

  };
};
