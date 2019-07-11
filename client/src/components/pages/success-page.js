import React from 'react';
import successImage from '../../styles-and-fonts/images/party-popper.png'

const Container = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "max-content",
    width: "auto",
    textAlign: "center",
    overflowY: "hidden"
}

const Note = {
    fontFamily: "Circular Bold",
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "50px",
    marginBottom: "50px",
    color: "#078d07"
}

const Image = {
    width: "20%",
    height: "20%"
}



const SuccessPage = () => {
    return (
        <div style={Container}>
            <div style={Note}>Congratulations! You've made a successful purchase</div>
            <img style={Image} src={successImage} alt="success"/>
        </div>
    )
}

export {
    SuccessPage
}


