import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import actions from '../store/Actions'
import { withCookies, Cookies } from 'react-cookie';

class EnsureEventLoggedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL, pages, isEventLoggedIn } = this.props

    var check = pages.indexOf(currentURL) > -1; //i.e the current page is amongst the 
    if (!(isEventLoggedIn)) { // the user is not logged in
      if(check){
        
        dispatch(actions.setRedirectUrl(currentURL))
        this.props.history.replace("/event.login")
      }
    }
  }

  render() {
    if (this.props.isEventLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  
  return {
    isEventLoggedIn: state.isEventAuthenticated,
    currentURL: ownProps.location.pathname
  }
}

export default withCookies(withRouter(connect(mapStateToProps)(EnsureEventLoggedInContainer)));