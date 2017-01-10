import React, { Component } from 'react';
import Footer from '../components/Footer/Footer';

import '../assets/styles/main.scss';
import '../assets/styles/recipe_card.scss';

export default class App extends Component {
  // componentWillMount() {

  // }
  render() {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
