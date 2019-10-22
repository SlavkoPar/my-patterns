
import React, { Component, useState, useEffect }  from 'react';

class SimpleDebounce extends Component {

	state = { search: '' }

	handleChange = (event) => {
		/*
		 * This is a simple implementation of a "debounce" function,
		 * which will queue an expression to be called in 250ms and
		 * cancel any pending queued expressions. This way we can
		 * delay the call 250ms after the user has stoped typing.
		 */
		clearTimeout(this.timeout);
		const { value } = event.target; // MORA TU, jer pogledaj dole 
		this.timeout = setTimeout(() => {
			this.setState({
				search: value // event.target.value
			})
		}, 250);
	}
	

	render() {
		const { search } = this.state;
      	return (
          <div>
              <input type="text" onChange={this.handleChange} style={{border: '3px solid yellow'}} />
              {search ? (<p>Search for: {search}</p>) : null}
          </div>
    	)
	}

 }


 export default SimpleDebounce;


