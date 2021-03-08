import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {delEdu} from '../../actions/profile'

const Experiences = ({edus, delEdu}) => {

    const educations = edus.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {
                    edu.to === null ? (' Now') : (<Moment format='DD/MM/YYYY'>{edu.to}</Moment>)
                }
            </td>
            <td>
                <button className='btn btn-danger'onClick={(e) => {
                    e.preventDefault()
                    delEdu(edu._id)    
                }
                }>Delete</button>
            </td>
        </tr>
    ))

    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Shool
                        </th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </>
    )
}

Experiences.propTypes = {
    edus: PropTypes.array.isRequired,
}

export default connect(null, {delEdu})(Experiences)
