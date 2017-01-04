import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { term: '' }
    this.search = _.debounce((isSubmit) => {this.sendSearch(isSubmit)}, 500)
  }

  onInputChange(event) {
    this.setState({term: event.target.value})
    this.search(false)
    return null
  }

  sendSearch(isSubmit) {

    if (isSubmit) {
      var url = browserHistory.getCurrentLocation().pathname + '?term=' + this.state.term
      browserHistory.push(url)
      this.setState({term: ''})
    } else {
      var searchstring = '?term=' + this.state.term
      this.props.fetchRecipes(searchstring)
    }
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.search(true)
  }
 
  render() {
    //console.log('RECIPES: ', this.props.recipes)
    return (
      <form
        className="input-group"
        onSubmit={this.onFormSubmit.bind(this)}
      >
        <input
          placeholder="Search for recipes..."
          className="form-control"
          id="searchfield"
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

//REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes } from '../../actions/index'

const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)