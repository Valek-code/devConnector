import React, { Component } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
import PropTypes from 'prop-types'


class Register extends Component {
    state = { 
        name: '',
        email: '',
        password: '',
        password2: ''
    }

    onSubmit = async (e) => {
        e.preventDefault();

        

        if(this.state.password !== this.state.password2){
            this.props.setAlert('Passwords do not match', 'danger')
        }else{
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            this.props.register(newUser)
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    clearState = () => {
        this.setState(
        {
        name: '',
        email: '',
        password: '',
        password2: ''
        })
    }

    render() {
      const isAuth = this.props
      if(isAuth){
        return (
          <Redirect to='/' />
        )
      }
        return (
            <>
            <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
           
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
    </>
        )
    }
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {setAlert, register})(Register);