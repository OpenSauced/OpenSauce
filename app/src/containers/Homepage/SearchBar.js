import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      waitForResults: false,
      previousPayload: []
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.search = _.debounce((isSubmit, offset) => {this.sendSearch(isSubmit, offset)}, 300)
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
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom + 600 >= docHeight && this.state.waitForResults === false) {
      this.setState({waitForResults: true})
      this.search(false, this.props.offset);
    }
  }

  onInputChange(event) {
    this.props.clearRecipes()
    this.props.updateSearchTerm(event.target.value)
    this.props.setDbOffset(0)
    this.search(false, this.props.offset)
    this.state = {
      forkedRecipes: true,
      savedRecipes: true,
      myRecipes: true
    }
    return null
  }

  sendSearch(isSubmit, offset) {
    let location = browserHistory.getCurrentLocation()
    if (isSubmit) {
      let url = location.pathname + (this.props.searchTerm ? '?term=' + this.props.searchTerm : '')
      browserHistory.push(url)

    } else {
      //this.props.clearRecipes()
      switch (location.pathname) {
        case '/':
          let searchstring = this.props.searchTerm ? '?term=' + this.props.searchTerm : location.search;
          let offsetString = 'offset=' + offset;
          this.props.fetchRecipes(searchstring, offsetString)
          .then((results) => {
            this.setState({waitForResults: false});
            if (this.state.previousPayload !== results.payload.data) {
              this.setState({previousPayload: results.payload.data})
              this.props.setDbOffset(this.props.offset + 6)
            }
          })
          break
        case '/myrecipes':
      }
    }
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.search(true, this.props.offset)
  }

  // I dont think this is even being used right?
  // onCheckboxChange(event) {
  //   this.search(false, event.target.id)
  // }

  render() {
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
import { fetchRecipes, updateSearchTerm, clearRecipes, setDbOffset } from '../../actions/index'

const  mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    offset: state.offset
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, updateSearchTerm, clearRecipes, setDbOffset }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
