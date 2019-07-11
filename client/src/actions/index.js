
const defaultListLoaded = (listId) => {
    return {
        type: 'DFT',
        payload: listId
    }
}

const changeListInc = (listId) => {
    return {
        type: 'INC',
        payload: listId
    }
}

const changeListDec = (listId) => {
    return {
        type: 'DEC',
        payload: listId
        }
    }


const moviesLoaded = (newMovies) => {
    return {
        type: 'MOVIES_LOADED',
        payload: newMovies
    }
}

const imagePathLoaded = (path) => {
    return {
        type: 'IMAGE_PATH_LOADED',
        payload: path
    }
}

const moviesFound = (text) => {
    return {
        type: 'MOVIES_FOUND',
        payload: text
    }
}


const movieIdGot = (id) => {
    return {
        type: 'MOVIE_ID_GOT',
        payload: id
    }
}

const movieLoaded = (movie) => {
    return {
        type: 'MOVIE_LOADED',
        payload: movie
    }
}

const dataRequested = () => {
    return {
        type: 'DATA_REQUESTED'
    }
}

const itemAddedToCart = (id) => {
    return {
        type: 'ITEM_ADDED_TO_CART',
        payload: id
    }
}

const itemsAddedToCart = (quantity) => {
    return {
        type: 'ITEMS_ADDED_TO_CART',
        payload: quantity
    }
}

const itemRemovedFromCart = (id) => {
    return {
        type: 'ITEM_REMOVED_FROM_CART',
        payload: id
    }
}

const itemDeletedFromCart = (index) => {
    return {
        type: 'ITEM_DELETED_FROM_CART',
        payload: index
    }
}

const cartReloaded = (cartItems) => {
    return {
        type: 'CART_RELOADED',
        payload: cartItems
    }
}

const shippingAddressAdded = (newShippingAdress) => {
    return {
        type: 'SHIPPING_ADDRESS_ADDED',
        payload: newShippingAdress
    }
}

const itemAddedToCheckout = (id2) => {
    return {
        type: 'ITEM_ADDED_TO_CHECKOUT',
        payload: id2
    }
}

const itemsAddedToCheckout = (items) => {
    return {
        type: 'ITEMS_ADDED_TO_CHECKOUT',
        payload: items
    }
}

const itemsAddedToCheckoutFromPP = (quantity) => {
    return {
        type: 'ITEM_ADDED_TO_CHECKOUT_FROM_PP',
        payload: quantity
    }
}



export {
    defaultListLoaded,
    moviesLoaded,
    imagePathLoaded,
    changeListInc,
    changeListDec,
    moviesFound,
    movieIdGot,
    movieLoaded,
    dataRequested,
    itemAddedToCart,
    itemRemovedFromCart,
    itemDeletedFromCart,
    cartReloaded,
    shippingAddressAdded,
    itemAddedToCheckout,
    itemsAddedToCheckout,
    itemsAddedToCheckoutFromPP,
    itemsAddedToCart
};