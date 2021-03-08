import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import PropTypes from 'prop-types'


class Navbar extends Component {
    render() {
    const {auth: {isAuth, loading}, logout} = this.props

    const authLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/dashboard"><i className="fas fa-user"></i><span className='hide-sm'></span>Dashboard</Link></li>
            <li><a onClick={logout} href='#!'><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Log Out</span></a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
    <nav className="navbar bg-dark">
        <h1>
            <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
        {!loading && (<Fragment>{isAuth ? authLinks : guestLinks}</Fragment>)}
    </nav>
    )
    }
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps, {logout})(Navbar)