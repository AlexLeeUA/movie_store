import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser()
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div className="dashboard">
                <span className="dashboard-span">Hi, {user.name}</span>
                <button className="dashboard-button" onClick={this.onLogoutClick}>Logout</button>
            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, {logoutUser})(Dashboard);