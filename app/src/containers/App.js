import React, { Component } from 'react';

import '../assets/styles/main.scss';
import '../assets/styles/recipe_card.scss';

export default class App extends Component {
  componentDidMount() {

  	$(window).scroll(function() {
  		//console.log("this!!!!!!!!! ", $(this).scrollTop())
    if ($(this).scrollTop() > 400) {
    	console.log("WE DID IT!")
    	console.log($('.navbar'))
        $('.navbar').attr('style',  'background-color:rgb(60, 114, 80)');
    }
    if ($(this).scrollTop() < 400) {
    	//console.log("WE DID IT!")
    	//console.log($('.navbar'))




      
        $('.navbar').attr('style',  'background-color:rgba(60, 114, 80, 0.8)');
    }
	});
  	 
  }


  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

