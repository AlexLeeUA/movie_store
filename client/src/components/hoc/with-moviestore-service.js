import React from 'react';
import { MoviestoreServiceConsumer } from '../moviestore-service-context';

const withMoviestoreService = () => (Wrapped) => {
    
    return (props) => {
        return (
            <MoviestoreServiceConsumer>
                {
                    (moviestoreService) => {
                        return (<Wrapped {...props} moviestoreService={moviestoreService} />)
                    }
                }
            </MoviestoreServiceConsumer>
        )
    }
}

export {
    withMoviestoreService
};