import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'

class FilterBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isForkedRecipesChecked: true,
        isSavedRecipesChecked: true,
        isMyRecipesChecked: true,
        waitForResults: false,
        previousPayload: []
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.search = _.debounce((id, offset) => {this.sendSearch(id, offset)}, 100)
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
    if (windowBottom + 600 >= docHeight && this.state.waitForResults === false && document.body.scrollTop > 50) {
      this.setState({waitForResults: true})
      this.search(false, this.props.offset);
    }
  }

  sendSearch(id, offset) {
    
    switch(id) {
      case 'saved_recipes_checkbox':
        this.setState({isSavedRecipesChecked: this.state.isSavedRecipesChecked ? false : true})
        this.props.clearRecipes();
        break
      case 'forked_recipes_checkbox':
        this.setState({isForkedRecipesChecked: this.state.isForkedRecipesChecked ? false : true})
        this.props.clearRecipes();
        break 
      case 'my_recipes_checkbox':
        this.setState({isMyRecipesChecked: this.state.isMyRecipesChecked ? false : true})
        this.props.clearRecipes();
        break 
    }

    var filter = {
      isForkedRecipesChecked: this.state.isForkedRecipesChecked,
      isSavedRecipesChecked: this.state.isSavedRecipesChecked,
      isMyRecipesChecked: this.state.isMyRecipesChecked
    }

    this.props.getUserRecipes(filter, offset)
    .then((results) => {
      this.setState({waitForResults: false})
      if (this.state.previousPayload !== results.payload) {
        this.setState({previousPayload: results.payload})
        this.props.setDbOffset(this.props.offset + 6)
      }
    })
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  onCheckboxChange(event) {
    this.props.setDbOffset(0)
    this.search(event.target.id, this.state.offset)
  }

  render() {
    return (
      <div>
      <h3> now viewing: </h3>
        <label><input
          id="saved_recipes_checkbox" 
          onChange={this.onCheckboxChange.bind(this)} 
          type="checkbox" 
          checked={this.state.isSavedRecipesChecked}
        />SAVED RECIPES</label> &nbsp; &nbsp; 
        <label><input
          id="forked_recipes_checkbox"  
          onChange={this.onCheckboxChange.bind(this)} 
          type="checkbox" 
          checked={this.state.isForkedRecipesChecked}
        />FORKED RECIPES</label> &nbsp; &nbsp; 
        <label><input 
          id="my_recipes_checkbox" 
          onChange={this.onCheckboxChange.bind(this)} 
          type="checkbox" 
          checked={this.state.isMyRecipesChecked}
        />MY RECIPES</label>
      </div>
    )
  }
}
//REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserRecipes, clearRecipes, setDbOffset } from '../../actions/index'

const  mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    offset: state.offset
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ getUserRecipes, clearRecipes, setDbOffset }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)