import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// HOC
export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.authenticated)
        browserHistory.push('/')
    }

    componentWillUpdate(nextProps) {//on new props, or re rendered
      if(!nextProps.authenticated)
        browserHistory.push('/')
    }

    render() {
      console.log("Auth HOC:", this.props.authenticated)
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
