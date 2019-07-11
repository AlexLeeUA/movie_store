import React, {Component} from 'react';
import Spinner from '../spinner';
import { Link } from 'react-router-dom';
import { movieLoaded, dataRequested, itemRemovedFromCart, itemAddedToCart, itemAddedToCheckout, itemsAddedToCheckoutFromPP, itemsAddedToCart} from '../../actions';
import {withMoviestoreService} from '../hoc';
import {connect} from 'react-redux';

import './movie-page.css';
import './../movie-list-item/movie-list-item.css'

const GetGenres = ({genres}) => {
    const names = genres.map((genre)=>genre.name);
    return (
       <div>
            {names.join(' | ')}
        </div>
    )
}

class UpdateMovieInCart extends Component {
        
    state = {
        quantity: 0
    }  
        
    incr = () => {
        this.setState({quantity: this.state.quantity+1});
    }
        
    decr = () => {
        if (this.state.quantity>0) {
            this.setState({quantity: this.state.quantity-1});
        }
    }

    render() {
        const {itemsAddedToCheckoutFromPP, itemsAddedToCart} = this.props;
        return ( 
            <div>
                <ul className="quantity-value">
                    <li><button onClick={this.decr}>-</button></li>
                    <li className="value">{this.state.quantity}</li>
                    <li><button onClick={this.incr}>+</button></li>
                </ul>
                <div className="purchasing">
                    <Link to="/checkout">
                        <button className="buy-now" onClick={() => itemsAddedToCheckoutFromPP(this.state.quantity)}>Buy Now</button>
                    </Link>                        
                    <button className="add-to-cart" onClick={() => itemsAddedToCart(this.state.quantity)}>Add to Cart</button>   
                </div>
            </div>
        )
    }
}

class MoviePage extends Component {

    componentDidMount() {
        this.updateMovie()
    }

    updateMovie() {
        const { moviestoreService, movieId, dataRequested } = this.props;

        dataRequested();
        moviestoreService.getItem(movieId)
            .then((movie) => {
                this.props.movieLoaded(movie)
            })           
    }

    render() {

        const {movie, imagePath, loading, defaultPrice, itemsAddedToCheckoutFromPP, itemsAddedToCart} = this.props;
        const fullPath=`${imagePath}${movie.path}`;
        const genres = movie.genres;    

        if (loading) {
            return <Spinner />
        }

        return (
            <div>
                <div className="movie-data">
                    <img className="movie-image" src={fullPath} alt='movie-poster'></img>
                    <div className="movie-info" id={movie.id}>
                        <div className="movie-title">
                            {movie.title}
                        </div>
                        <div className="details">
                            <div className="movie-genre">Movie genre: <GetGenres genres={genres} /></div>
                            <div className="movie-release">Release: <div>{movie.release}</div></div>
                        </div>
                        <div className="overview">
                            <div className="overview-name">OVERVIEW</div>
                            <div className="overview-value">{movie.overview}</div>
                        </div>
                        <div className="movie-price">
                            <div className="price-name">PRICE</div>
                            <div className="price-value">${defaultPrice}</div>
                        </div>
                        <div className="quantity">
                            <div className="quantity-name">QUANTITY</div>
                            <div className="purchase">
                                <UpdateMovieInCart itemsAddedToCheckoutFromPP={itemsAddedToCheckoutFromPP} itemsAddedToCart={itemsAddedToCart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        movies: state.main.movies,
        imagePath: state.main.imagePath,
        movieId: state.main.movieId, 
        movie: state.main.movie,
        loading: state.main.loading,
        defaultPrice: state.main.defaultPrice,
        defaultQuantity: state.main.defaultQuantity,
        cartItems: state.main.cartItems,
        checkoutItems: state.main.checkoutItems
    }
}

const mapDispatchToProps = {
    movieLoaded,
    dataRequested,
    itemRemovedFromCart,
    itemAddedToCart,
    itemAddedToCheckout,
    itemsAddedToCheckoutFromPP,
    itemsAddedToCart
}

export default withMoviestoreService()(connect(mapStateToProps, mapDispatchToProps)(MoviePage));