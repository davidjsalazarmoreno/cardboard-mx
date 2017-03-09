// React
import * as React from 'react';

// React Redux
import { connect } from 'react-redux';

// Components
// import component from 'componentPath';


const component = (props) => {
  return(
    <div className="container">
      
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      console.log()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
