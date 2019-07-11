import React from 'react';
import MovieList from '../movie-list';

const HomePage = ({movieListId}) => {
    return (
    <div>
        <MovieList movieListId={movieListId} />
    </div>
    )
}

export default HomePage;