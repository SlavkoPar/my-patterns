import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TITLE = 'React GraphQL GitHub Client';

class StateFull extends Component {

	state = {
	  path: 'the-road-to-learn-react/the-road-to-learn-react',
	  organization: null,
	  errors: null,
	};
 
 
	componentDidMount() {
	  this.onFetchFromGitHub(this.state.path);
	}
 
	onSubmit = event => {
	  this.onFetchFromGitHub(this.state.path);
	  event.preventDefault();
	};
	
	
	onChange = event => {
	  this.setState({ path: event.target.value });
	};
 

	onFetchFromGitHub = path => {
		const [organization, repository] = path.split('/');
	 };
  
 
	render() {
	  const { path, organization, errors } = this.state;
	  return (
		 <div>
			<h3>{TITLE}</h3>
			<form onSubmit={this.onSubmit}>
			  <label htmlFor="url">
				 https://github.com/
			  </label>
			  <input
				 id="url"
				 type="text"
				 onChange={this.onChange}
				 style={{ width: '300px' }}
			  />
			  <button type="submit">Search</button>
			</form>
			<hr />
			{/* Here comes the result! */}
			{organization ? (
			  <Organization organization={organization} errors={errors} />
			) : (
			  <p>No information yet ...</p>
			)}
		 </div>
	  );
	}
 }
 
 const Organization = ({ organization, errors }) => {
	if (errors) {
	  return (
		 <p>
			<strong>Something went wrong:</strong>
			{errors.map(error => error.message).join(' ')}
		 </p>
	  );
	}
	return (
	  <div>
		 <p>
			<strong>Issues from Organization:</strong>
			<a href={organization.url}>{organization.name}</a>
		 </p>
		 <Repository repository={organization.repository} />
	  </div>
	);
 };
 
 const Repository = ({ repository }) => (
	<div>
	  <p>
		 <strong>In Repository:</strong>
		 <a href={repository.url}>{repository.name}</a>
	  </p>
	  <ul>
		 {repository.issues.edges.map(issue => (
			<li key={issue.node.id}>
			  <a href={issue.node.url}>{issue.node.title}</a>
			</li>
		 ))}
	  </ul>
	</div>
 );
 
 export default StateFull;
 
 
