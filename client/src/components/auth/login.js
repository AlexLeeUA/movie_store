import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import './login.css';


class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: {},
        redirectToReferrer: false
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.setState({
                redirectToReferrer: true
            })
        }

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.setState({
                redirectToReferrer: true
            })
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    }

    render() {
        const { errors } = this.state;
        const { from } = this.props.location.state || { from: { pathname: `/home`} };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div className="login-page">
                <div className="container">
                    <h1 className="login-title">Login</h1>
                    <div className="check-question">
                        <span>Don't have an account?</span>
                        <Link to="/register">
                            <span>Register</span>
                        </Link>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor="email">Email*</label>
                            <div className="input-block">
                                <div className="error">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                            </div>                           
                        </div>
                        <div>
                            <label htmlFor="password">Password*</label>
                            <div className="input-block">
                                <div className="error">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                            </div>
                        </div>
                        <div className="container-button">
                            <button className="login-button" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );        
    }    
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { loginUser })(Login);