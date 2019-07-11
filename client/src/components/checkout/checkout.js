import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {shippingAddressAdded, cartReloaded, itemAddedToCheckout, itemsAddedToCheckout, dataRequested} from '../../actions';
import Spinner from '../spinner';

import './checkout.css'
import './../shopping-cart-table/shopping-cart-table.css';
import mastercard from '../../styles-and-fonts/images/visa-ms.png';
import paypal from '../../styles-and-fonts/images/paypal.png';


const DashBoard = ({checkoutItems}) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue;            
    const totalItemsPrice = checkoutItems.map(({price}) => price).reduce(reducer, 0);
    
        return (
            <tbody>
                <tr>
                    <td className="sub-total">Sub-total:</td>
                    <td style={{textAlign: "right"}}className="sub-total-price">${totalItemsPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="shipping">Shipping:</td>
                    <td className="shipping-value">Free</td>
                </tr>
                <tr>
                    <td className="grand-total">Grand Total:</td>
                    <td className="grand-total-value">${totalItemsPrice.toFixed(2)}</td>
                </tr>
            </tbody>
        )
    }
    
class ShippingAddressForm extends Component {
    
    state = {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        
        firstNameError: '',
        lastNameError: '',
        address1Error: '',
        address2Error: '',
        cityError: '',
        stateError: '',
        zipError: '',
        phoneError: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    checkInputFields = (shippingAddress) => {
        const error = 'This field is required';
        const errors = [];
        if(shippingAddress.firstName.length === 0) {
            this.setState({ firstNameError: error });
            errors.push(error);
        } else this.setState({ firstNameError: '' })
        if(this.state.lastName.length === 0) {
            this.setState({ lastNameError: error });
            errors.push(error);
        } else this.setState({ lastNameError: '' })
        if(shippingAddress.address1.length === 0) {
            this.setState({ address1Error: error });
            errors.push(error);
        } else this.setState({ address1Error: '' })
        if(shippingAddress.city.length === 0) {
            this.setState({ cityError: error });
            errors.push(error);
        } else this.setState({ cityError: '' })
        if(shippingAddress.state.length === 0) {
            this.setState({ stateError: error });
            errors.push(error);
        } else this.setState({ stateError: '' })
        if(shippingAddress.zip.length === 0) {
            this.setState({ zipError: error });
            errors.push(error);
        } else this.setState({ zipError: '' })

        return errors;
    }

    shippingAddressAdd = () => {
        
        const shippingAddress = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phone: this.state.phone
        };
        
        const errors = this.checkInputFields(shippingAddress);
        console.log(errors);      

        if (errors.length === 0) {
            this.props.shippingAddressAdded(shippingAddress);
        }

    }

    render() {
        
        return (
            <div >
                <div className="shipping-form">
                    <div className="shipping-form-group">
                        <div className="input-block" style={{marginRight: "20px"}}>
                            <div className="error">{this.state.firstNameError}</div>
                            <input id="firstName" type="text" placeholder="First Name" onChange={this.onChange}  />
                        </div>
                        <div className="input-block">
                            <div className="error">{this.state.lastNameError}</div>
                            <input id="lastName" type="text" placeholder="Last Name" onChange={this.onChange} />
                        </div> 
                    </div>

                    <div className="shipping-form-group">
                        <div className="input-block" style={{marginRight: "20px"}}>
                            <div className="error">{this.state.address1Error}</div>
                            <input id="address1" type="text" placeholder="Address 1" onChange={this.onChange} /> 
                        </div>
                        <div className="input-block">
                            <input id="address2" type="text" placeholder="Address 2" onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="shipping-form-group">
                        <div className="input-block" style={{marginRight: "20px"}}>
                            <div className="error">{this.state.cityError}</div>
                            <input id="city" type="text" placeholder="City" onChange={this.onChange} />
                        </div>
                        <div className="input-block" style={{marginRight: "20px"}}>
                            <div className="error">{this.state.stateError}</div>
                            <select id="state" onChange={this.onChange}>
                                <option>State</option>
                                <option>Alaska</option>
                                <option>Arkansas</option>
                                <option>Arisona</option>
                            </select>  
                        </div>
                        <div className="input-block">
                            <div className="error">{this.state.zipError}</div>
                            <input id="zip" type="text" placeholder="Zip-code" onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="shipping-form-group">
                        <div className="input-block">
                            <input id="phone" type="number" placeholder="Phone number" onChange={this.onChange} />
                        </div>
                    </div>
                    <div>
                        <button className="add-the-address" onClick={this.shippingAddressAdd}>Add the address</button>
                    </div>
                </div>
            </div>
        )
    }           
}    
   
class ShippingAddressAdded extends Component {
    
    shippingAddressChange = () => {
        this.props.shippingAddressAdded({})
    }

    render() {
        const {shippingAddress} = this.props;
        return (
            <div>
                 <div id="result">
                     <div>
                         <span>{shippingAddress.firstName}</span>
                         <span>{shippingAddress.lastName}</span>
                     </div>
                     <div>
                         <span>{shippingAddress.address1}</span>
                         <span>{shippingAddress.address2}</span>
                     </div>
                     <div>
                         <span>{shippingAddress.city}</span>
                         <span>{shippingAddress.state}</span>
                         <span>{shippingAddress.zip}</span>
                     </div>
                     <div style={{marginBottom: "0px"}}>{shippingAddress.phone}</div>
                 </div>
                 <button className="change-the-address" onClick={this.shippingAddressChange}>Change the address</button>
            </div>
        )
    }
}

class ShippingAddress extends Component {

   render() {
       const {shippingAddress, shippingAddressAdded} = this.props;

       if (shippingAddress.address1) {
            return (
                <div className="shipping-container">
                    <div className="title">Shipping Address</div>
                    <ShippingAddressAdded shippingAddress={shippingAddress} shippingAddressAdded={shippingAddressAdded} />  
                </div>
            )
        }

        return (
            <div className="shipping-container">
                <div className="title">Shipping Address</div>
                <ShippingAddressForm shippingAddress={shippingAddress} shippingAddressAdded={shippingAddressAdded}/> 
             </div>
        )
       }
   }



const CheckoutItems = ({checkoutItems, imagePath}) => {
  
    return (
        <div>
            <ul className="checkout-items">
                {checkoutItems.map((movie) => {
                    return (
                        <li key={movie.id} className="item">
                            <div className="item-info">
                                <img className="picture" src={`${imagePath}${movie.path}`} alt='pic'/>
                                <div className="item-data">
                                    <div className="title">{movie.title.toUpperCase()}</div>
                                    <div className="quantity">
                                        <span>Quantity: {movie.quantity} </span>
                                    </div>
                                </div>
                            </div>
                            <div className="price">${movie.price.toFixed(2)}</div>   
                        </li>
                    )
                    }
                )}
            </ul>
        </div>     
    )   
}


class Checkout extends Component {

    state = {
        checkedCC: true,
        checkedPP: false,
    }

    onHandleChange = () => {
        this.setState({checkedCC: !this.state.checkedCC, checkedPP: !this.state.checkedPP});      
    }

    updateCartItems = () => {
        const { dataRequested } = this.props;
        dataRequested();

        setTimeout(()=>this.props.history.push(`/finish`), 2000);
        setTimeout(()=>this.props.cartReloaded([]), 3000);
    }

    backgroundCC = {};
    backgroundPP = {};

    changeBackgroundCC = () => {
        if (this.state.checkedCC===true) {
            this.backgroundCC = {
                backgroundColor: "#0894a1"
            }
        } else 
            this.backgroundCC = {
                backgroundColor: "#f4f4f4"
            }
        return this.backgroundCC;
    }

    changeBackgroundPP = () => {
        if (this.state.checkedPP===true) {
            this.backgroundPP = {
                backgroundColor: "#0894a1"
            }
        } else 
            this.backgroundPP = {
                backgroundColor: "#f4f4f4"
            }
        return this.backgroundPP;
    }

    

    

  
    render() {
        const {checkoutItems, shippingAddress, imagePath, shippingAddressAdded, loading} = this.props;
        this.changeBackgroundCC();
        this.changeBackgroundPP();

        if (loading) {
            return <Spinner />
        }
        
        return (        
        
            <div className="checkout">
                <div className="payment-shipping-container">
                    <div>
                        <div className="title">Payment Method</div>
                        <label htmlFor="cc">
                            <div className="methodOne" id="methodOne" style={this.backgroundCC}>
                                <div className="method-name">
                                    <input type="radio" name="type" className="credit-card" id="cc" checked={this.state.checkedCC} onChange={this.onHandleChange}/>
                                    <span>CreditCard</span>
                                </div>
                                <img className="master-vs-img" src={mastercard} alt="mastercard-visa-icon" />  
                            </div>
                        </label>
                        <label htmlFor="pp">
                            <div className="methodTwo" id="methodTwo" style={this.backgroundPP}>
                                <div className="method-name">
                                    <input type="radio" name="type" className="pay-pal" id="pp" checked={this.state.checkedPP} onChange={this.onHandleChange}/>
                                    <span>PayPal</span>
                                </div>
                                <img className="paypal-img" src={paypal} alt="paypal-icon" />
                            </div> 
                        </label>
                    </div>

                    <div className="shipping-address">
                        <ShippingAddress shippingAddress={shippingAddress} shippingAddressAdded={shippingAddressAdded} />
                    </div>
                </div>
                <div className="confirm-and-pay">
                    <div className="confirm-and-pay-info">
                        <div className="title">Order Summary</div>
                        <div className="total-dashboard">
                            <table className="checkout-table">
                                <DashBoard checkoutItems={checkoutItems} />
                            </table>
                        </div>
                        <div>
                            <CheckoutItems checkoutItems={checkoutItems} imagePath={imagePath} />
                        </div>
                    </div>
                    <button className="confirm-and-pay-button" onClick={this.updateCartItems}>Confirm and Pay</button>
                </div>
            </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        shippingAddress: state.main.shippingAddress,
        checkoutItems:state.main.checkoutItems,
        cartItems: state.main.cartItems,
        imagePath: state.main.imagePath,
        defaultQuantity: state.main.defaultQuantity,
        defaultPrice: state.main.defaultPrice,
        loading: state.main.loading,
    }
}

const mapDispatchToProps = {
    shippingAddressAdded,
    cartReloaded,
    itemAddedToCheckout,
    itemsAddedToCheckout,
    dataRequested
}
   

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));

