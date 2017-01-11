import React, { Component } from 'react';

class AddRecipeTypeOfInsert extends Component {
  constructor (props) {
    super (props)
    this.state = {
      renderInputs: 'manual'
    }
  }

  componentWillMount () {
    this.setState({ renderInputs: this.props.renderInputs})
  }

  componentWillReceiveProps(nextProps) {
    let type = nextProps.renderInputs
    if ( type ) {
      console.log('next RPops----', type)
      this.setState({
        renderInputs: type
      })
    }
  }

  render () {
   return (
      <div className="row justify-content-center">
        { 
          this.state.renderInputs === 'link'
            // if the parent state recipeInputs is 'manual' (not 'link')
            // the state in this component will be 'manual' too
                // this will render the 'link' button to navigate out of manual edit

            // Add the manual link recipe button
            ? <div className="col-2">
                <button 
                  className="btn btn-primary" 
                  name="manual" 
                  onClick={this.props.renderClick}
                >Add Your Own Recipe
                </button>
              </div>
            //add the recipe via link button
            : <div className="col-2">
                <button 
                  className="btn btn-primary" 
                  name="link" 
                  onClick={this.props.renderClick}
                >Get A Recipe From A Link
                </button>
              </div>
        }
       
      </div>
    );
  }
}

export default AddRecipeTypeOfInsert;

