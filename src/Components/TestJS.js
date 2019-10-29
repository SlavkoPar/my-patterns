import React, { Component }  from 'react';


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


    const ShoppingCart = [
      {name: 'Abc', type:"book", amount: 3.00},
      {name: 'Def', type:"info", amount: 10.50},
      {name: 'Ghi', type:"book", amount: 7.0},
      {name: 'Jkl', type:"info", amount: 4.00},
      {name: 'Mno', type:"book", amount: 5.50}
    ]
    const byBooks = (order) => order.type === "book";
    const cartAmount = (order) => order.amount;
    const suma = (acc, amount) => acc + amount;
    const total = ShoppingCart
                .filter(byBooks)
                .map(cartAmount)
                .reduce(suma, 0);

    //////////////////////
    // Grouped people
    var people = [
      { name: 'Dexon', age: 20 },
      { name: 'Alice', age: 21 },
      { name: 'Jane', age: 20 }
    ];
       
    function fn(acc, obj) {
      var key = obj['age'];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }

    const groupedPeople = people.reduce(fn, {});

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
          first param desc
          <br/>
          second param asc
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
        <div>
        total: {total}
        </div>
        <hr/>
        <div>
          groupedPeople is:
          <pre>
          {` 
          var people = [
            { name: 'Dexon', age: 20 },
            { name: 'Alice', age: 21 },
            { name: 'Jane', age: 20 }
          ];          

          {
            20: [ { name: 'Dexon', age: 20 }, { name: 'Jane', age: 20 } ], 
            21: [{ name: 'Alice', age: 21 }] 
          }`}
          </pre>
          <ul>
          { 
            Object.entries(groupedPeople).map(item => 
              <li>
                {item[0]}  
                  <div>{ 
                    item[1].map(it => <span>{it.name} {it.age},</span>)
                  }</div>
              </li>)
          }
          </ul>
        </div>
			</>
		)
	 }

 }


 export default TestJS;



