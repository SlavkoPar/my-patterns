import React, { Component, useState, useEffect }  from 'react';

const arr = []

function printMyName(name, count) {
	if (count <= name.length) {
		arr.push(name.substring(0, count));
		printMyName(name, ++count);
	}
}  

function factorial(x) {
  if (x < 0) return;
  if (x === 0) return 1;
  return x * factorial(x - 1);
}


////////////////////////////////////////////
// return str.split("").reverse().join("");
function reverseString(str) {
  if (str === "")
    return "";
  else
    return reverseString(str.substr(1)) + str.charAt(0);
}


class Recurse extends Component {

	state = { name: "John", age: 42, fact: 0}

	componentWillMount() {
		this.setState({
			fact: factorial(3),
			reversed: reverseString("hello")
		});
	}

	render() {
		const { fact, reversed } = this.state;

		printMyName("Bhargav", 1);


		return (
		  <>
			 <pre>
				 Formated state object <br />
				 <b>JSON.stringify(this.state, null, 2)</b>
				 <br />
        {JSON.stringify(this.state, null, 2)}
      </pre>

			<hr/>

			<div>
				{
					arr.map(it => <div>{it}</div>)
				}
			</div>

			<hr/>

			<div>
				Factorial: {fact}
			</div>

			<hr/>

			<div>
				Reversed: {reversed}
			</div>

	  </>
	  )
	}
  }

 export default Recurse;


