import React, { Component } from 'react';
import HomePage, { CartPage, CheckoutPage } from '../pages';
import MoviePage from '../movie-page/';
import MovieList from '../movie-list';
import Login from '../auth/login';
import Register from '../auth/register';
import { Route, Switch, withRouter } from 'react-router-dom';
import ShopHeader from '../shop-header';
import {withMoviestoreService} from '../hoc';
import {connect} from 'react-redux';
import {SuccessPage} from '../pages/success-page';

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser} from "../../actions/authActions";
import PrivateRoute from '../private-route/private-route';
import store from '../../store';
import './app.css';



// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
    }
  }

class App extends Component {

    render() {
        const {movieListId} = this.props;

        return (
            <div key={this.props.location.pathname} className="main-container">
                <div>
                    <ShopHeader movieListId={movieListId} history={this.props.history} />
                </div>
                <div className="content">
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/home" component={HomePage} />
                        <Route path="/login" render={(props) => (<Login {...props} history={this.props.history} />) }/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/cart" component={CartPage} exact />
                        <Route path="/movielist/:id/" render={({match}) => {
                                                            const {id} = match.params;
                                                            return <MovieList movieListId={id} />}} />
                        <Route path="/finish" component={SuccessPage} />
                        <Route path="/movie/:id" render = {({match}) => {
                                                            const {id} = match.params;
                                                            return <MoviePage movieId={id} />}} />
                        <PrivateRoute path="/checkout" component={CheckoutPage} exact />
                    </Switch>
                </div>
            </div>                      
        )
    }
}

const MapStateToProps = (state) => {
    return {
        movieListId: state.main.movieListId,
        cartItems: state.main.cartItems
    }
}

export default withRouter(withMoviestoreService()(connect(MapStateToProps)(App)));

