import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from  "../../actions/authActions";
import classnames from "classnames";

import './register.css';

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
          }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };
        this.props.registerUser(newUser, this.props.history)
    }
    
    render() {
        const {errors} = this.state;

        return (
            <div className="register-page">
                <div className="container">
                    <h1 className="register-title">Register</h1>
                    <div className="check-question">
                        <span>Already have an account?</span>
                        <Link to="/login">
                            <span>Log in</span>
                        </Link>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor="name">Name*</label>
                            <div className="input-block">
                                <div>{errors.name}</div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                            </div>                            
                        </div>
                        <div>
                            <label htmlFor="email">Email*</label>
                            <div className="input-block">
                                <div className="error">{errors.email}</div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                            </div>                                              
                        </div>
                        <div>
                            <label htmlFor="password">Password*</label>
                            <div className="input-block">
                                <div className="error">{errors.password}</div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password2">Confirm password*</label>
                            <div className="input-block">
                                <div className="error">{errors.password2}</div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                            </div>                       
                        </div>
                        <div className="container-button">
                            <button className="register-button" type="submit">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>             
        );        
    }    
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register));