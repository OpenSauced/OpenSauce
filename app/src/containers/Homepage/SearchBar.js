import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { term: '' }
  }

  onInputChange(event) {
    //create a case and match it to the element id, update state accordingly
    //you may remove the switch if if only one search field is needed.
    switch(event.target.id) {
    case 'searchfield':
      this.setState({term: event.target.value})
      break;
    }
    return null
  }

  onFormSubmit(event) {
    event.preventDefault()
    var url = browserHistory.getCurrentLocation().pathname + '?term=' + this.state.term
    browserHistory.push(url)
    //this.props.searchRecipes(this.state.term)
    //console.log('Submitting Search Term: ', this.state.term)
    this.setState({term: ''})

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
import { searchRecipes } from '../../actions/index'

const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ searchRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)