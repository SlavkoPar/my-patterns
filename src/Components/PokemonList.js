import React, { useState, useEffect }  from 'react';
import Paginator from 'react-hooks-paginator';

import axios from 'axios';

/*
https://www.robinwieruch.de/react-with-graphql-tutorial

npm install axios --save
npm i react-hooks-paginator
*/

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://graphql-pokemon.now.sh/',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },

});

/*
    attacks {
      special {
        name
        type
        damage
      }
    }
*/
const getPokemons = `
{
  pokemons(first: 50) {
    id
    number
    name
    weight {
      minimum
      maximum      
    }
    height {
      minimum
      maximum
    }
    types
    image
  }
}
`;

function PokemonList() {

  const pageLimit = 6;
 
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  var errors = null

  // replaces both componentDidMount and componentDidUpdate
  useEffect(() => {
    axiosGitHubGraphQL
      .post('', {
        query: getPokemons,
      })
      .then(result => {
			const z = JSON.stringify(result.data.data.pokemons)
          setData(result.data.data.pokemons)
          // errors: result.data.errors,
        }
      );
 }, []);

 useEffect(() => {
  setCurrentData(data.slice(offset, offset + pageLimit));
}, [offset, data]);

  return (
    <div>
      {/* Here comes the result! */}
      {data ? (
        <div>
          <Pokemons pokemons={currentData} errors={errors} />
          <Paginator
            totalRecords={data.length}
            pageLimit={pageLimit}
            pageNeighbours={2}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <p>No information yet ...</p>
      )}
    </div>
  );
}



const Pokemons = ({ pokemons, errors }) => {
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
        <strong>Pokemons:</strong>
      </p>
      <ul className="pokemon-list">
      {pokemons.map(pokemon => (
        <Pokemon pokemon={pokemon} />
      ))}
    </ul>
    
    </div>
  );
};

const Pokemon = ({ pokemon }) => {
  const { id, types, name, image, weight } = pokemon;
  return (
    <li key={id} className="pokemon">
    <img src={image} style={{height: '50px'}} alt="Slika"></img>
      Pokemon: {name}
      <div>
        Types
        <div>
        {types.map((t) =>
          <div>{t}</div>
        )}
        </div>
      </div>
      <br />
      <div>
        Weight
          <div>min: {weight.minimum}</div>
          <div>max: {weight.maximum}</div>
      </div>
    </li>
  )
};

export default PokemonList;