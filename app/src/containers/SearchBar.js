
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { term: '' }
  }

  onInputChange(event) {
    this.setState({term: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.setState({term: ''})
  }

  render() {
    return (
      <form
        className="input-group"
        onSubmit={this.onFormSubmit.bind(this)}
      >
        <input
          placeholder="Search for recipes..."
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange.bind(this)}
        />

        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </span>
      </form>
    )
  }
}