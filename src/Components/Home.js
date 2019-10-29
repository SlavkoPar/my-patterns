import React, { Component }  from 'react';

class Home extends Component {

	componentDidUpdate(prevProps) {
	  // will be true
	  var locationChanged = this.props.location !== prevProps.location;
	  console.log(locationChanged)

	  // INCORRECT, will *always* be false because history is mutable.
	  locationChanged =
		 this.props.history.location !== prevProps.history.location;
		
		console.log(locationChanged)
	}

	render() {
		return (
	
			<div className="container">
				<div className="a">
					<div>a01</div>
					<div>a02</div>
					<div>a03</div>
					<div>a04</div>
					<div>a05</div>
					<div>a06</div>
					<div>a07</div>
					<div>a08</div>
					<div>a09</div>
					<div>a10</div>
					<div>a11</div>
					<div>a12</div>
				</div>

				<div className="b">
					<div>b01</div>
					<div>b02</div>
					<div>b03</div>
				</div>

				<div className="c">
					<div>c01</div>
					<div>c02</div>
					<div>c03</div>
				</div>
			</div>			
		)
	 }

 }


 export default Home;


