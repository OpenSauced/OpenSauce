import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes } from '../actions/index'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { term: '' }
  }

  onInputChange(event) {
    //create a case and match it to the element id, update state accordingly
    switch(event.target.id) {
    case 'pizzaparty':
        this.setState({term: event.target.value})
        break;
    }
    return null
  }

  onFormSubmit(event) {
    event.preventDefault()

    this.setState({term: ''})
    //this.props.fetchRecipes()
  }
  componentDidMount() {
    this.props.fetchRecipes()

  }

  render() {
    console.log('RECIPES: ',this.props.recipes)
    return (
      <form
        className="input-group"
        onSubmit={this.onFormSubmit.bind(this)}
      >
        <input
          placeholder="Search for recipes..."
          className="form-control"
          id="pizzaparty"
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

const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
