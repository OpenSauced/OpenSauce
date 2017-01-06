import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.search = _.debounce((isSubmit) => {this.sendSearch(isSubmit)}, 500)
  }

  onInputChange(event) {
    this.props.updateSearchTerm(event.target.value)
    //this.setState({term: event.target.value})
    this.search(false)
    return null
  }

  sendSearch(isSubmit) {
    console.log('-----------', this.props);
    var location = browserHistory.getCurrentLocation()
    if (isSubmit) {
      var url = location.pathname + (this.props.searchTerm ? '?term=' + this.props.searchTerm : '')
      browserHistory.push(url)

    } else {
      this.props.clearRecipes()
      var searchstring = this.props.searchTerm ? '?term=' + this.props.searchTerm : location.search
      this.props.fetchRecipes(searchstring)
    }
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.search(true)
  }

  render() {
    //console.log(this.props.searchTerm)
    return (
      <form className="form" onSubmit={this.onFormSubmit.bind(this)}>
          <div className="form-group searchBarButtonCombo">
            <div className="flex-items-xs-center">
              <input type="text" autoComplete="off"
                placeholder="Search for recipes..."
                className="form-control"
                id="searchfield"
                value={this.props.searchTerm}
                onChange={this.onInputChange.bind(this)}
              />
            </div>
            {/* <div className="col-xs-4 col-sm-2">
              <button type="submit" className="submitButton btn btn-primary">Submit</button>
            </div> */}
          </div>
      </form> )

    }
  }

//REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, updateSearchTerm, clearRecipes } from '../../actions/index'

const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, updateSearchTerm, clearRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
