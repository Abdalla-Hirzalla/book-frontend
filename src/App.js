import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LogIn from './Login'
import BestBooks from './BestBooks'
import Profile from './profile'
import Logout from './Logout'
import Books from './BestBooks';
class App extends React.Component {


  render() {
    const {isAuthenticated} =this.props.auth0;
    console.log('app', this.props);
    console.log(isAuthenticated);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">

                {isAuthenticated ? 
                <BestBooks /> : <LogIn />}
              </Route>

              <Route exact path="/profile">
              {isAuthenticated ? 
                <Profile/> : <LogIn />}
              </Route>
             
            
              

            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
