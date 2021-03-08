import React, { Component, Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import { DashboardActios } from './DashboardActios'
import Experiences from './Experiences'
import Educations from './Educations'
import {delAccount} from '../../actions/profile'

export const Dashboard = ({getCurrentProfile, delAccount, auth ,auth: {user}, profile: {profile, loading}}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return loading && user && profile === null ? <Spinner /> : 
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">

        <i className="fas fa-user"></i> Welcome {user && user.name}!

        </p>

        {profile !== null && !loading ? 
        <Fragment>

            <DashboardActios/>
            <Experiences exp={profile.experience}/>
            <Educations edus={profile.education}/>
            <div className='my-2'>
                <button className="btn btn-danger" onClick={() => delAccount()}>

                    <i className="fas fa-user-minus"></i>{' '} Delete my account

                </button>
            </div>
        </Fragment> : 


        <Fragment>

            <p>You have not yet setup a profile, please add some info.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>

        </Fragment>
        
        
        }
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    delAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, delAccount})(Dashboard)

