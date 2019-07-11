import React from 'react';

const {
    Provider: MoviestoreServiceProvider,
    Consumer: MoviestoreServiceConsumer
} = React.createContext();

export {
    MoviestoreServiceProvider,
    MoviestoreServiceConsumer
}