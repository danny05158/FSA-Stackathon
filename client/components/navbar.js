import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

//MATERIAL UI IMPORTS
import {AppBar, Toolbar, withStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const styles = theme => ({
  root: {
    width: '100%'
  }
})

class Navbar extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {classes, theme} = this.props
    const {anchorEl} = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <Grid container justify="space-between" alignitems="center">
              <Grid item component={Link} to="/" xs={9}>
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  Input Text To Analyse
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  aria-owns={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.handleClick}
                >
                  <MenuIcon />
                </IconButton>

                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                  className={classes.popper}
                >
                  {({TransitionProps, placement}) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom'
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            <div>

                              <MenuItem onClick={this.handleClose}>
                                <Link to="/" style={{textDecoration: 'none'}}>
                                  Home
                                </Link>
                              </MenuItem>

                              <MenuItem onClick={this.handleClose}>
                                <Link
                                  to="/search"
                                  style={{textDecoration: 'none'}}
                                >
                                  Search
                                </Link>
                              </MenuItem>

                            </div>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(
  withStyles(styles, {withTheme: true})(Navbar)
)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
