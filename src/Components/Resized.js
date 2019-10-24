import React, { Component, useState, useEffect }  from 'react';

class Resized extends Component {

	constructor(props){
	  super(props);
	  this.state = { width: 0, height: 0, nameInput: null }
	  this.updateDimensions = this.updateDimensions.bind(this);
	}
	 
	componentWillMount() {
	  	this.updateDimensions()
	}
  
	componentDidMount() {
		this.nameInput.focus()
	  	window.addEventListener('resize', this.updateDimensions)
	}
  
	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateDimensions)
	}
  
	updateDimensions() {
	  this.setState({width: window.innerWidth, height: window.innerHeight})
	}
  
	render() {
		const { width, height } = this.state;
	  return (
		  <>
			<div>
				Re-render the view when the browser is resized <br/> {width} x { height}
			</div>
			<hr />
			<div>
				<input	defaultValue={'Won\'t focus'}	/>
				<input	ref={(input) => this.nameInput = input}	defaultValue={'Will focus'}	/>
			</div>
	  </>
	  )
	}
  }

 export default Resized;


