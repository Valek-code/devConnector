import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import {getProfileById} from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExp from './ProfileExp'
import ProfileEdu from './ProfileEdu'
import ProfileGitHub from './ProfileGitHub'


const Profile = ({ auth,getProfileById,match, profile: {profile, loading} }) => {

    useEffect(() => {

        getProfileById(match.params.id)
    
    }, [getProfileById, match.params.id])

    return (
        <>
          {profile === null || loading ? <Spinner/> : 
          <>
          <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
          {auth.isAuth && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit profile</Link>)}
          </>}
          <div class="profile-grid my-1">
            {profile === null ? null : 
            <>
                <ProfileTop profile={profile}/>
                <ProfileAbout profile = {profile}/>
                <div className='profile-exp bg-white p-2'>
                    <h2>Experience</h2>
                    {profile.experience.length > 0 ? 
                    <>
                        {profile.experience.map(experience => (
                            <ProfileExp key={experience._id} experience={experience} />
                        ))}
                    </>
                    :
                    <h4>No experience credentials</h4>
                    }
                    
                </div>
                <div className='profile-edu bg-white p-2'>
                    <h2>Education</h2>
                    {profile.education.length > 0 ? 
                    <>
                        {profile.education.map(education => (
                            <ProfileEdu key={education._id} education={education} />
                        ))}
                    </>
                    :
                    <h4>No education credentials</h4>
                    }
                    
                </div>

                {!profile.githubusername ? null : (
                    <ProfileGitHub username={profile.githubusername}/>
                )}
                
            </>}
          </div>
        </>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile)
