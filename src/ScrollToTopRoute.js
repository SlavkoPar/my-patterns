import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class ScrollToTop extends Component {

	/*
		https://blog.bitsrc.io/the-love-hate-relationship-between-react-router-and-react-components-dee4aac5956c
	*/
	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		const { component: Component, RouteKey, location, ...rest } = this.props;

		/**
		 * Sometimes we need to force a React Route to re-render when the
		 * search params (query) in the url changes. React Router does not
		 * do this automatically if you are on the same page when the query
		 * changes. By passing the `RouteKey`ro the `ScrollToTopRoute` and
		 * setting it to true, we are passing the combination of pathname and
		 * search params as a unique key to the component and that is a enough
		 * and clear trigger for the component to re-render without side effects
		 */
		const Key = RouteKey ? location.pathname + location.search : null;

		return <Route {...rest} render={props => (<Component {...props} key={Key} />)} />;
	}
}

ScrollToTop.propTypes = {
	path: PropTypes.string,
	location: PropTypes.shape({
		pathname: PropTypes.string,
	}),
	component: PropTypes.instanceOf(Component),
	RouteKey: PropTypes.object,
};


const ScrollToTopRoute = withRouter(ScrollToTop)

export { ScrollToTopRoute };