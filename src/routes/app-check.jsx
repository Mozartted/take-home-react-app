import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/Actions/Auth";
import { withRouter } from "react-router";
import { withCookies, Cookies } from 'react-cookie';

class AppCheck extends React.Component {
  componentDidUpdate(prevProps) {
    const { redirectUrl, history } = this.props;
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

    if (isLoggingIn) {
		// dispatch(navigateTo(redirectUrl));
      history.push(redirectUrl);
    } else if (isLoggingOut) {
	  // do any kind of cleanup or post-logout redirection here
      history.push('/login');
    }
  }

  componentDidMount(){
    const { currentURL, pages, dispatch, isLoggedIn } = this.props;
    if (isLoggedIn){
      dispatch(actions.autoLogin());
    }
  }

  render() {
    return this.props.children;
  }
}




const mapStateToProps = state => {
  
  return {
    isLoggedIn: state.isAuthenticated,
    redirectUrl: state.redirectUrl
  };
};

export default withCookies(withRouter(connect(mapStateToProps)(AppCheck)));
