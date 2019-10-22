import React, { Component } from 'react';
import PropTypes from 'prop-types';

const StatelessFunctionalComponent = ({name}) => {

	const sayHi = (event) => {
		alert(`Hi ${name}`)
	}

	return (
		<div>
			<a href="#" onClick={sayHi}>Say Hi</a>
		</div>
	)

}

StatelessFunctionalComponent.PropTypes = {
	name: PropTypes.string.isRequired
}

export default StatelessFunctionalComponent;
