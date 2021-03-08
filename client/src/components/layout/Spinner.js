import PropTypes from 'prop-types'
import { Fragment } from 'react'
import spinner from './spinner.gif'

const Spinner = props => {
    return (
        <Fragment>

            <img
            src={spinner}
            style={{width:"200px", margin:"auto", display:"block"}}
            alt="Loading"
            />

        </Fragment>
            
    )
}

Spinner.propTypes = {

}

export default Spinner
