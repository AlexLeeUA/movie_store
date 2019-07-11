import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import MoviestoreService from './services/moviestore-service';
import { MoviestoreServiceProvider } from './components/moviestore-service-context';

import store from './store';

const moviestoreService = new MoviestoreService();


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <MoviestoreServiceProvider value={moviestoreService}>
                <Router>
                    <App />
                </Router>                
            </MoviestoreServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
)





