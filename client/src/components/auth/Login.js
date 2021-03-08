import React, { Component } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'


class Login extends Component {
    state = { 
        email: '',
        password: '',
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password)
        this.clearState()
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    clearState = () => {
        this.setState(
        {
        email: '',
        password: '',
        })
    }

    render() {
      const {login} = this.props
      const {isAuth} = this.props
      if(isAuth){
        return (
          <Redirect to='/' />
        )
      }
        return (
            <>
            <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sing Into Your Account</p>
      <form className="form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
    </>
        )
    }
}


Login.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login)