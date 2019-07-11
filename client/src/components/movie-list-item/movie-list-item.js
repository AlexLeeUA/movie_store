import React, {Component} from 'react';
import { itemAddedToCart, itemAddedToCheckout } from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './movie-list-item.css';

const PurchaseButtons = ({onAddedToCheckout, onAddedToCart, movie}) => {
    return (
        <div className="purchasing">
            <Link to="/checkout">
                <button className="buy-now" onClick={() => onAddedToCheckout(movie.id)}>Buy Now</button>
            </Link>                        
            <button className="add-to-cart" onClick={() => onAddedToCart(movie.id)}>Add to Cart</button>   
        </div>
    )
}

class MovieListItem extends Component {
    
       render() {
        const { movie, imagePath, onAddedToCart, onAddedToCheckout, defaultPrice } = this.props;
        const fullPath=`${imagePath}${movie.path}`;

        return (
            <div className="movie-list-item">
                <div className="main-data">
                    <img className="poster" src={fullPath} alt='movie-poster' />
                    <div className="movie-list-content">
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none'}}>
                            <h2 id={movie.id} className="movie-title">{movie.title.toUpperCase()}</h2>
                        </Link>
                        <div className="content">
                            <div className="movie-popularity">Popularity {movie.popularity}</div>
                            <div className="movie-release">Release {movie.release}</div>
                        </div>
                        <div className="movie-price">
                            <div className="price-name">PRICE</div>
                            <div className="price-value">${defaultPrice}</div>
                        </div>
                    </div>
                </div> 
                <div className="movie-list-buttons">
                    <PurchaseButtons onAddedToCheckout={onAddedToCheckout} onAddedToCart={onAddedToCart} movie={movie} /> 
                </div>
            </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        defaultPrice: state.main.defaultPrice
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddedToCart: (id) => dispatch(itemAddedToCart(id)),
        onAddedToCheckout: (id2) => dispatch(itemAddedToCheckout(id2)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);
export {
    PurchaseButtons
}
