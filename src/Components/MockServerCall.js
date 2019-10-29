import React, { Component }  from 'react';

function mockServerCall() {

	return new Promise((resolve, reject) => {

		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data': {
					dataOfInterest: 42
				}
			})
		}, 250)

	})

}



class MockServerCall extends Component {
	state = { d: 11 }
	render() {
		var  { d } = this.state;
		mockServerCall()
			.then(({ data: { dataOfInterest = 100 } }) => {
				this.setState({d: dataOfInterest});
				// 42 (but would default to 100)
			})


		return (
			<div>
				dataOfInterest 42 (but would default to 100): {d}
			</div>			
		)
	 }

 }


 export default MockServerCall;


