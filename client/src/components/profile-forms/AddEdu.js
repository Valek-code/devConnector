import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addEdu} from '../../actions/profile'


const AddEdu = ({addEdu, history}) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)


    const {school, degree, fieldofstudy, from, to, current, description} = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        addEdu(formData, history)
    }

    return (
        <div>
            <h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value = {school}
            onChange = {e => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value = {degree}
            onChange = {e => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value = {fieldofstudy} onChange = {e => onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value = {from} onChange = {e => onChange(e)}/>
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" name="current" value = {current} onChange={(e) => {
                setFormData({...formData, current: !current})
                toggleDisabled(!toDateDisabled)
            }} /> {' '}Current School or Bootcamp
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value = {to} onChange = {e => onChange(e)} />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value = {description}
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </div>
    )
}

AddEdu.propTypes = {
    addEdu: PropTypes.func.isRequired,
}

export default connect(null, {addEdu})(withRouter(AddEdu))
