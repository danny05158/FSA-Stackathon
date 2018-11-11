import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {submitData} from '../store/search'
import Chart from './Chart'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

const data = {
 Business: '1',
  Economy: '1',
  Technology: '1',
  'Economy of New York City': '2',
  NASDAQ: '2',
  Microsoft: '2',
  'Market capitalization': '2',
  Google: '2'
}

export class SearchBar extends React.Component {
  constructor(){
    super()
    this.state = {
      search: []
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
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Input Text To Search
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSubmit}>
              <InputBase
                placeholder="Search…"
                name="search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange = {this.handleChange}
              />
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

            </div>
            <div className={classes.sectionMobile}>

            </div>
          </Toolbar>
        </AppBar>
        <Chart data={data}/>
      </div>


    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatch = dispatch => ({
  submitData: data => dispatch(submitData(data))
})

export default connect(null, mapDispatch)(withStyles(styles)(SearchBar))

