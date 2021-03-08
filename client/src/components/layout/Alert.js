import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Alert extends Component {
    render() {
        const alerts = this.props.alerts
        return (
            <>
            {alerts !== null && alerts.length > 0 && alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            ))}
            </>
        )
    }
}


Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, null)(Alert)