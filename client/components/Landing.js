import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

//MATERIAL UI IMPORTS
import {withStyles} from '@material-ui/core/styles'


const styles = theme => ({})

class Landing extends Component {
  render() {
    return (
      <div
        style={{
          background:
            'url(/images/data.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100vh',
        }}
      >

      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

Landing.propTypes = {
  classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(withStyles(styles)(Landing))
