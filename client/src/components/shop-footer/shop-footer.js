import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {changeListInc, changeListDec} from '../../actions';
import {connect} from 'react-redux';
import './shop-footer.css';


class Button extends Component {

    componentDidMount() {
        this.update()
    }

    update = () => {
        const {movieListId} = this.props;
   
        if (movieListId<2) {
            return document.getElementById('dec').style.display = 'none';
         }
            return document.getElementById('dec').style.display = '';
    }

    render() {  
        const {changeListDec} = this.props
        return (
            <button id="dec" onClick={changeListDec} style={{display: "none"}}>Previous</button>
        )
    }
}


class ShopFooter extends Component  {   

    render() {
        const {movieListId, changeListInc, changeListDec} = this.props;

        return (
            <div className="list-number">
                <Link to={`/movielist/${movieListId-1}/`}>
                    <Button changeListDec={changeListDec} movieListId={movieListId}/>
                </Link>
                <div className="page-number">{movieListId}</div>
                <Link to={`/movielist/${movieListId+1}`}>
                    <button onClick={changeListInc}>Next</button>  
                </Link>
            </div>
    )
    }    
}

const mapStateToProps = (state) => {
    return {
        movieListId: state.main.movieListId,
    }
}

const mapDispatchToProps = {
    changeListInc,
    changeListDec
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFooter);