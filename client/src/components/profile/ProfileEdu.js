import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileEdu = ({education: {school, degree, fieldofstudy, current, to, from, description}}) => {
    return (
        <div>
            <h3 className='text-dark'>{school}</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? ' Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p><strong>Degree: </strong>{degree} </p>
            <p><strong>Field of study: </strong>{fieldofstudy} </p>
            <p><strong>Description: </strong>{description ? <span>{description}</span> : '-'}</p>
        </div>
    )
}

ProfileEdu.propTypes = {
    education: PropTypes.array.isRequired,
}

export default ProfileEdu
