import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {defaultListLoaded} from '../../actions';
import Dashboard from '../dashboard/dashboard';
import './shop-header.css';
import logo from '../../styles-and-fonts/images/logo.svg';
import cart from '../../styles-and-fonts/images/cart.svg';


class LoginAndRegister extends Component {
    render() {
        return (
            <div className="log-en-reg">
                <Link to={{pathname: "/login", state: {from: this.props.history.location}}} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="login" id="login">
                        Log in
                    </div>
                </Link>

                <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="register" id="register">
                        Register
                    </div>
                </Link>
            </div>
        )
    }
}

class Cart extends Component {
    render() {
        const {cartItems} = this.props;
        
        if(cartItems.length>0) {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const totalItems = cartItems.map(({quantity}) => quantity).reduce(reducer);
            return (
                <Link to="/cart">
                    <div className="shopping-cart">                
                        <img src={cart} className="shopping-cart-icon" alt="cart" />
                        <div className="counter"><span className="total">{totalItems}</span></div>
                    </div>
                </Link>
            )
        }

        return (
            <Link to="/cart">
                <div className="shopping-cart">                
                    <img src={cart} className="shopping-cart-icon" alt="cart" />
                </div>
            </Link>
        )
    }
}

class ShopHeader extends Component {

    render() {
        const {cartItems, movieListId, defaultListLoaded} = this.props;

        if (this.props.auth.isAuthenticated) {
            return (
                <header>
                    <div className="header-elements">
                        <Link to={`/home`} style={{ textDecoration: 'none' }}>
                            <div className="header-title" onClick={()=>defaultListLoaded(movieListId)}>
                                <img src={logo} className="logo" alt="logo" />
                                <h1 className="name">Movies Store</h1>
                            </div>
                        </Link>
                        <div className="account-switch">
                            <Dashboard />
                            <Cart cartItems={cartItems} />
                        </div>
                    </div>
                </header>
            )
        }        
        
        return (
            <header>
                <div className="header-elements">
                    <Link to={`/home`} style={{ textDecoration: 'none' }}>
                        <div className="header-title" onClick={()=>defaultListLoaded(movieListId)}>
                            <img src={logo} className="logo" alt="logo" />
                            <h1 className="name">Movies Store</h1>
                        </div>
                    </Link>
                    <div className="account-switch">
                        <LoginAndRegister history={this.props.history}/>
                        <Cart cartItems={cartItems} />
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.main.cartItems,
        movieListId: state.main.movieListId,
        defaultListLoaded: state.main.defaultListLoaded,
        user: state.auth.user,
        auth: state.auth
    }
}

const mapDispatchToProps = {
        defaultListLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);