import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.search = _.debounce((isSubmit) => {this.sendSearch(isSubmit)}, 300)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      // at bottom
    } else {
      // not at bottom
    }
  }

  onInputChange(event) {
    this.props.updateSearchTerm(event.target.value)
    this.search(false)
    this.state = {
      forkedRecipes: true,
      savedRecipes: true,
      myRecipes: true
    }
    return null
  }

  sendSearch(isSubmit) {
    var location = browserHistory.getCurrentLocation()
    //console.log(location)
    if (isSubmit) {
      var url = location.pathname + (this.props.searchTerm ? '?term=' + this.props.searchTerm : '')
      browserHistory.push(url)
    } else {
      this.props.clearRecipes()
      switch (location.pathname) {
        case '/':
          var searchstring = this.props.searchTerm ? '?term=' + this.props.searchTerm : location.search
          this.props.fetchRecipes(searchstring, filter)
          break
        case '/myrecipes':
          console.log('TODO: MAKE SEARCHBAR ALSO WORK IN MYRECIPES') 
      }
    }
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.search(true)
  }

  // I dont think this is even being used right?
  // onCheckboxChange(event) {
  //   this.search(false, event.target.id)
  // }

  render() {
    //console.log(this.props.searchTerm)
    return (
      <div className="d-flex justify-content-center">
      <form
        className="col-8"
        onSubmit={this.onFormSubmit.bind(this)}
      >
        <input
          placeholder="Search for recipes..."
          className="form-control"
          id="searchfield"
          value={this.props.searchTerm}
          onChange={this.onInputChange.bind(this)}
        />
      </form>
      </div>
    )
  }
}

//REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, updateSearchTerm, clearRecipes } from '../../actions/index'

const  mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, updateSearchTerm, clearRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)