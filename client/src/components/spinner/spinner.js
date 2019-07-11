import React from 'react';

import './spinner.css';

const styleSpinner = {
    display: "flex",
    justifyContent: "center"
}

const Spinner = () => {
    return (
        <div className="lds-css ng-scope" style={styleSpinner}>
            <div className="lds-rolling">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Spinner;