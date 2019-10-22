import React, { Component, useState, useEffect }  from 'react';


const Test = (props) => (
	<div>
	  {props.code}
	</div>
  );
  

class PromiseALL extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  data : { deck_id: 'unknown' },
		  sve: []
		}
	  }

	componentDidMount() {

		fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
		  .then(response => response.json())
		  .then(data => this.setState({ data }))
		  .then(() => {
			const { deck_id } = this.state.data;
			const urls = [
				`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`,
			  	`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`,
				`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
			];
			  /*
				Promise.all(urls.map(url => fetch(url)))
				.then(resp => Promise.all( resp.map(r => r.text()) ))
				.then(result => {
				console.log(result)
				});
			  */
			  Promise.all(urls.map(url => fetch(url)))
				.then(resp => Promise.all( resp.map(r => r.json().then(data=>data.cards[0].code)) ))
				.then(result => {
				  this.setState( {
					sve: result
				  });
				});//.then(data =>
			  // sve.push(<Test data={data} />)));//ReactDOM.render(sve, document.getElementById('myDiv'));
			  // ReactDOM.render(
			  // <Test items={items} contactlist={contactlist} itemgroup={itemgroup} />,
			  // document.getElementById('overview');
			  // );
			})
		  .catch((err) => {
			console.log(err);
		  });
		//.catch(error => this.setState({ error, isLoading: false }));
	  }

	render() {
		const { deck_id } = this.state.data
		const { sve } = this.state
		const rows = sve.map(code => <Test key={code} code={code} />)

		return (
			<div>
				<div>{deck_id}</div>
				<div>
					{rows}
				</div>
			</div>			
		)
	 }

 }


 export default PromiseALL;


