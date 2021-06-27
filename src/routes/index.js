// import scenes here and make routes of them
import React from 'react';
import {Route, Redirect, useHistory, Switch} from 'react-router-dom';
import {
	NoMatch,
	CustomerView,
	WorkOrderView
} from "../pages"


const Routes = () => {
	
	return(
		<React.Fragment>
			<Switch>
				<Route path="/" component={WorkOrderView} />
				<Route path="/customer" component={CustomerView} />
				<Route render={() => <NoMatch path="/"/> }/>
			</Switch>
		</React.Fragment>
	)
};

export default Routes;