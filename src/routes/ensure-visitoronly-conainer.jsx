import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import actions from "../store/Actions";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class EnsureVisitorOnlyContainer extends React.Component {
  componentDidMount() {
    const { currentURL, pages,dispatch } = this.props;

    var check = pages.indexOf(currentURL) > -1; //if the current route is an internal route, redirect to a visitor route
    if (this.props.isLoggedIn) {
      if (check) {
        
        this.props.history.replace("/home");
      }
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

function mapStateToProps(state, ownProps) {
  
  return {
    isLoggedIn: state.isAuthenticated,
    currentURL: ownProps.location.pathname
  };
}

export default withCookies(withRouter(connect(mapStateToProps)(EnsureVisitorOnlyContainer)));
