import React, { Component, useState, useEffect }  from 'react';


function Counted(acc, ch) {
  if (ch in acc) {
    acc[ch]++;
  }
  else {
    acc[ch] = 1;
  }
  return acc;
}

function maximumOccurringCharacter(text) {
  const arr = text.split('')
  var counted = arr.reduce(Counted, {});

  // convert object to array
  var a = Object.entries(counted)
  a.sort(function(a,b) { return b[1] - a[1] })
  return a[0][0]
}



function SortBy2Params(arr) {
  arr.sort(function(a,b) { 
    // first param desc
    if ( b[1] < a[1] ){
      return -1;
    }
    if ( b[1] > a[1] ){
      return 1;
    }
    // second param asc
    if ( a[0] < b[0] ){
      return -1;
    }
    if ( a[0] > b[0] ){
      return 1;
    }
    return 0
  })

  return arr;
}

class TestJS extends Component {
	
	render() {

    const arr = [
      ['a', 3],
      ['b', 4],
      ['c', 3],
    ];
    SortBy2Params(arr);
  
    var maxOccurring = maximumOccurringCharacter("Hello World");
  

		return (
			<>
				<h1>JavaScript Tests, {this.props.name}</h1>
				<p>
				<code>Components/TestJS.js</code>.
				</p>
        <hr/>
        <div>
        maximum Occurring Character("Hello World"): '{maxOccurring}'
        </div>

        <hr/>

        <div>
          <code>
          <br/>
          // first param desc
          <br/>
          // second param asc
          <br/>
          <br/>
          SortBy2Params([
            <br/>
            ['a', 3],
            <br/>
            ['b', 4],
            <br/>
            ['c', 3],
            <br/>
          ])
          </code>
          <br/>
          <br/>
          Result:
          <ul>
            {arr.map(item => <li>[{item[0]}, {item[1]}]</li>)}
          </ul>
        </div>
        <hr/>
			</>
		)
	 }

 }


 export default TestJS;



