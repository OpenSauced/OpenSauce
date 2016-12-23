import React, { Component } from 'react'

export default class App extends Component {
  // componentWillMount() {

  // }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

