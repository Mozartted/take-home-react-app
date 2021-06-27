import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../store/Actions/Auth'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL, pages, isLoggedIn, user} = this.props

    const  nonVerifyPages = [
      '/emailconfirmation',
      '/addphone',
      '/phoneconfirmation'
    ]

    var check = pages.indexOf(currentURL) > -1; //i.e the current page is amongst the 
    if (!(isLoggedIn)) { // the user is not logged in
      if(check){
        dispatch(actions.setRedirectUrl(currentURL))
        this.props.history.replace("/login")
      }
    }else{
      // check if the user is set properly.
      // check if the routes are not onboarding routes.
      console.log(user)
      if(!user.email_verified){
        let checkVerified = nonVerifyPages.indexOf(currentURL) > -1
        if(!checkVerified){
          dispatch(actions.setRedirectUrl('/emailconfirmation'))
          this.props.history.replace("/emailconfirmation")
        }
      }
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.isAuthenticated,
    currentURL: ownProps.location.pathname,
    user: state.currentUser
  }
}

export default withCookies(withRouter(connect(mapStateToProps)(EnsureLoggedInContainer)));