import React from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import Login from './components/Login/Login';

const RouteLogin = ({}) => {
    return (
        <div className="container-flex wholeContainer">
            <AppHeader title={'Login'}/>
            <div className="container-fluid authPageContainer row">
                <div className="authPageContent col-centered col-xs-12 col-sm-12 col-md-5 col-lg-5">
                    <Login/>
                </div>
            </div>
          <Footer/>
        </div>
    );
}

export default RouteLogin;
