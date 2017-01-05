import React, {Component} from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: ''
        }
    }

    onInputChange(event) {
        //create a case and match it to the element id, update state accordingly
        //you may remove the switch if if only one search field is needed.
        switch (event.target.id) {
            case 'searchfield':
                this.setState({term: event.target.value})
                break;
        }
        return null
    }

    onFormSubmit(event) {
        event.preventDefault()
        this.props.searchRecipes(this.state.term)
        console.log('Submitting Search Term: ', this.state.term)
        this.setState({term: ''})

    }

    render() {
        //console.log('RECIPES: ', this.props.recipes)
        return (
            <form className="form" onSubmit={this.onFormSubmit.bind(this)}>
                <div className="form-group searchBarButtonCombo">
                  <div className="flex-items-xs-center">
                    <input type="text" autoComplete="off" placeholder="Search for recipes..." className="form-control" id="searchfield" value={this.state.term} onChange={this.onInputChange.bind(this)}/>
                  </div>
                  {/* <div className="col-xs-4 col-sm-2">
                    <button type="submit" className="submitButton btn btn-primary">Submit</button>
                  </div> */}
                </div>
            </form>
        )
    }
}

//REDUX STUFF
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {searchRecipes} from '../../actions/index'

const mapStateToProps = (state) => {
    return {recipes: state.recipes}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        searchRecipes
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
