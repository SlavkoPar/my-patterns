import React, { Component, useState, useEffect }  from 'react';

class Home extends Component {

	componentDidUpdate(prevProps) {
	  // will be true
	  var locationChanged =
		 this.props.location !== prevProps.location;
 
	  // INCORRECT, will *always* be false because history is mutable.
	  locationChanged =
		 this.props.history.location !== prevProps.history.location;
	}

	render() {
		return <h1>Home, {this.props.name}</h1>;
	 }

 }


 export default Home;


