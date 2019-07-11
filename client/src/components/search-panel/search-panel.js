import React, {Component} from 'react';
import {moviesFound} from '../../actions';
import {connect} from 'react-redux';

import './search-panel.css';


class SearchPanel extends Component {

    onSearchChange = (e) => {
        const searchReq = e.target.value;
        this.props.moviesFound(searchReq);       
    }

    render() {
    
        const { searchReq, movies } = this.props;
        
        return (
            <div className="search-panel">
                <div className="result"> {movies.filter((movie) => {return movie.title.toLowerCase().includes(searchReq.toLowerCase())}).length} Items found</div>
                <input className="search" type="text" placeholder='Search &#128269;' onChange={this.onSearchChange}></input>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.main.movies,
        searchReq: state.main.searchReq
    }     
}

const mapDispatchToProps = {
    moviesFound
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);