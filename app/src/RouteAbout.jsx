import React from 'react';
import { Router, Link } from 'react-router';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

const RouteAbout = () => {
  return (
    <div className="container-fluid">
      <HeaderNav/>
      <AppHeader title={'We\'re OpenSauce!'}/>
      <div className="container">
      <div className="row view-recipe-container">
        <div className="col-9 mx-auto">
          <div className="text-center">
            <img className="" src="/assets/opensaucelogo.png" alt="Main Logo Icon" height="100" width="100" />
          </div>
          <p>Inspired by open source, OpenSauce is an online repository where you can save, modify, and customize your favorite recipes. OpenSauce allows you to add your own recipes, pull them from your favorite cooking websites, or save your friends' recipes to your personal cookbook. Just like open source, you can fork any recipe and customize it the way you like to cook it!</p>
        </div>
      </div>
      <div className="row view-recipe-container">
        <div className="col-9 mx-auto">
          <div className="text-center">
            <h3>The Team</h3>
            <div className="imageBlockRecipeView w-100"
                    style={{'backgroundImage': 'url(/assets/team-boyfriend-trainer.jpg)', 'background-size': 'contain', 'background-repeat': 'no-repeat' }}>
            </div>
          </div>
          <ul className="team-list">
            <li><h5>Will Schwanke</h5><p>I like ranch dressing. Coding is cool too.</p></li>
            <li><h5>Bennett Staley</h5><p>If it ain't broke, break it. Then fix that bug.</p></li>
            <li><h5>Christopher Angelkos</h5><p>Looking forward to social night.</p></li>
            <li><h5>Carolyn Commons</h5><p>I like coding things that improve people's lives. And I love cats and sunshine.</p></li>
            <li><h5>Henry Hedges</h5><p>I am an amateur autonomist. Coding-wise: I've got big plans.</p></li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default RouteAbout;
