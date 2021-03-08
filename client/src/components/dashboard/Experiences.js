import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {delXp} from '../../actions/profile'

const Experiences = ({exp, delXp}) => {

    const experiences = exp.map(xp => (
        <tr key={xp._id}>
            <td>{xp.company}</td>
            <td className='hide-sm'>{xp.title}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{xp.from}</Moment> - {
                    xp.to === null ? (' Now') : (<Moment format='DD/MM/YYYY'>{xp.to}</Moment>)
                }
            </td>
            <td>
                <button className='btn btn-danger' onClick={(e) => {
                    e.preventDefault()
                    delXp(xp._id)    
                }
                }>Delete</button>
            </td>
        </tr>
    ))

    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Company
                        </th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </>
    )
}

Experiences.propTypes = {
    exp: PropTypes.array.isRequired,
    delXp: PropTypes.func.isRequired,
}

export default connect(null, {delXp})(Experiences)
