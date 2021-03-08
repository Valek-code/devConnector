import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileExp = ({experience: {company,title, location, current, to, from, description}}) => {
    return (
        <div>
            <h3 className='text-dark'>{company}</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? ' Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p><strong>Position: </strong>{title} </p>
            <p><strong>Description: </strong>{description ? <span>{description}</span> : '-'}</p>
        </div>
    )
}

ProfileExp.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default ProfileExp
