import {connect} from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import {submitData} from '../store/search'
import Chart from './Chart'

//MATERIAL UI IMPORTS
import Fab from '@material-ui/core/Fab'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})

export class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      search: [],
      visibility: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitData(this.state.search)
    this.setState({
      visibility: true
    })
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <Fab
          variant="extended"
          color="white"
          aria-label="Add"
          className={classes.margin}
        >
          <Toolbar>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <form onSubmit={this.handleSubmit}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </Toolbar>
        </Fab>
        {this.state.visibility ? <Chart /> : <div />}
      </div>
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatch = dispatch => ({
  submitData: data => dispatch(submitData(data))
})

export default connect(null, mapDispatch)(withStyles(styles)(SearchBar))
