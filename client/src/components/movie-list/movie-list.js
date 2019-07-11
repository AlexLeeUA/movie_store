import React, { Component } from 'react';
import {withMoviestoreService} from '../hoc';
import MovieListItem from '../movie-list-item';
import SearchPanel from '../search-panel';
import ShopFooter from '../shop-footer';
import Spinner from '../spinner';
import { connect } from 'react-redux';
import { moviesLoaded, imagePathLoaded, movieIdGot, dataRequested } from '../../actions';

import './movie-list.css';



class MovieList extends Component {
       
    componentDidMount() {
        this.updateList()
    }


    componentDidUpdate(prevProps) {
        if (this.props.movieListId !== prevProps.movieListId) {
            this.updateList()
        }
    }

    updateList() {
        const { moviestoreService, movieListId, dataRequested } = this.props;

        dataRequested();

        if (movieListId>0) {
            moviestoreService.getItemList(movieListId)
            .then((value) => {
                this.props.moviesLoaded(value);
            })
            moviestoreService.getImagePath()
            .then((path) => {
                this.props.imagePathLoaded(path);
            })
        }           
    }

    render() {
        const { movies, imagePath, movieIdGot, loading } = this.props;

        if (loading) {
            return <Spinner />
        }
      
        return (
            <div className="content-container" >
                <div className="movielist-container">
                    <SearchPanel />
                    <ul className="movielist" onClick={(e) => {return movieIdGot(e.target.id)}}>
                        {
                            movies.map((movie) => {
                                return (<li key={movie.id}><MovieListItem movie={movie} imagePath={imagePath} /></li>)
                            })
                        }
                    </ul>
                    <ShopFooter />
                </div>
            </div>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
        movies: state.main.movies.filter((movie) => {
            return movie.title.toLowerCase()
                    .includes(state.main.searchReq.toLowerCase())
        }),
        imagePath: state.main.imagePath,
        movieListId: state.main.movieListId,
        searchReq: state.main.searchReq,
        movieId: state.main.movieId,
        loading: state.main.loading,
    }
}

const mapDispatchToProps = {
    moviesLoaded,
    imagePathLoaded,
    movieIdGot,
    dataRequested,
}

export default withMoviestoreService()(connect(mapStateToProps, mapDispatchToProps)(MovieList));
