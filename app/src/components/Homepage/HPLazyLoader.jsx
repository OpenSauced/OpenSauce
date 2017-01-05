import React, { Component } from 'react'
import LazyLoad from 'react-lazy-load'
import axios from 'axios'

class HPLazyLoader extends Component {
  constructor () {
    super ()
    // this.state = {

    //   limit: 16,
    //   skip: 0
    // }
  }

  // loadMoreReduxRecipes () {
  //   const newSkip = this.state.skip + this.state.limit;
  //   console.log( 'new Skip: ', newSkip )
  //   axios.get('/api/recipes/', { params: { skip: newSkip } } )
  //   .then( (data) => { this.setState({ skip: newSkip }); })
  // }

  showElem () {
    console.log(this)
     // var r = this.getBoundingClientRect()
     // alert("Top/Left: "+r.top+" / "+r.left)
  }

  render() {
    return (
      <div>
        <LazyLoad onContentVisible={this.showElem()}>
          <h1>Loding More Recipes </h1>
        </LazyLoad>
      </div>
    )
  }
}

export default HPLazyLoader