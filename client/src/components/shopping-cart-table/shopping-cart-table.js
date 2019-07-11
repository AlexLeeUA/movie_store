import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {cartReloaded, itemAddedToCart, itemsAddedToCheckout, itemDeletedFromCart, itemRemovedFromCart} from '../../actions';

import './shopping-cart-table.css';
import emptyShoppingImage from '../../styles-and-fonts/images/empty-cart.png';


const dashBoard = ({cartItems}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;            
    const totalPrice = cartItems.map(({price}) => price).reduce(reducer)
    
        return (
            <tbody>
                <tr>
                    <td className="sub-total">Sub-total:</td>
                    <td style={{textAlign: 'right'}} className="sub-total-price">${totalPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="shipping">Shipping:</td>
                    <td style={{textAlign: 'right'}} className="shipping-value">Free</td>
                </tr>
                <tr>
                    <td className="grand-total">Grand Total:</td>
                    <td style={{textAlign: 'right'}} className="grand-total-value">${totalPrice.toFixed(2)}</td>
                </tr>
            </tbody>
        )
}

const quantityButtons = ({movie, itemRemovedFromCart, itemAddedToCart}) => {
    
    return (
        <ul className="quantity-value">
            <li><button onClick={()=>itemRemovedFromCart(movie.id)}>-</button></li>
            <li className="value">{movie.quantity}</li>
            <li><button onClick={()=>itemAddedToCart(movie.id)}>+</button></li>
        </ul>
    )      
}

class ShoppingCartTable extends Component {

    renderRow = (movie) => {
        
        const {imagePath, cartItems, itemAddedToCart, itemRemovedFromCart, itemDeletedFromCart} = this.props;
        const fullPath=`${imagePath}${movie.path}`;
        const index = cartItems.findIndex(({id}) => id === movie.id);
        
        return (
            <div key={movie.id} className="general-info">
                <div className="manage-info">
                    <button className="remove-item" onClick={()=>itemDeletedFromCart(index)} />
                    <img className="movie-image" src={fullPath} alt="movie" />
                    <div className="data">
                        <div className="movie-title">{movie.title.toUpperCase()}</div>
                        <div className="quantity">
                            <div className="quantity-name">QUANTITY</div>
                            <div>
                                {quantityButtons({movie, itemRemovedFromCart, itemAddedToCart})}
                            </div>
                        </div>   
                    </div>
                </div>
                <div className="price-value">
                    ${movie.price.toFixed(2)}
                </div>
            </div>
        )
    }

    render() {
        const {cartItems, movie, itemsAddedToCheckout} = this.props;

        if(cartItems.length===0) {
            return (
                <div className="empty-cart">
                    <div className="empty-cart-phrase">Ooops.. Your cart is empty</div>
                    <img className="empty-cart-image" src={emptyShoppingImage} alt="empty-cart" />
                </div>
            )
        } else {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;      
            const totalItems = cartItems.map((item) => item.quantity).reduce(reducer);
            return (
                <div className="cart-container">
                    <div className="cart-content">
                        <div className="cart">
                            <div className="title">My Cart</div>
                            <div key={movie.id} className="item-list">                                    
                                {cartItems.map(this.renderRow)}
                            </div>
                        </div>
        
                        <div className="purchase-items">
                            <div className="data-table">
                                <table className="checkout-table">
                                    <thead>
                                        <tr>
                                            <td className="order">Your Order</td>
                                            <td><span className="items">{totalItems} Items</span></td>
                                        </tr>
                                    </thead>
                                    {dashBoard({cartItems})}
                                </table>
                            </div>
                            <Link to="/checkout">
                                <button className="checkout-button" onClick={()=>itemsAddedToCheckout(cartItems)}>Go to checkout</button>
                            </Link>          
                        </div>
                    </div>    
                </div>
            )}
        
        
    }
}

const mapStateToProps = (state) => {
    return {
        imagePath: state.main.imagePath,
        movieId: state.main.movieId,
        movie: state.main.movie,
        cartItems: state.main.cartItems,
        checkoutItems: state.main.checkoutItems,
        defaultPrice: state.main.defaultPrice
    }
}

const mapDispatchToProps = {
    cartReloaded,
    itemAddedToCart,
    itemsAddedToCheckout,
    itemRemovedFromCart,
    itemDeletedFromCart
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);