import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import { Dropdown } from 'semantic-ui-react';



// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;


// create a component that renders a select input for coutries
function CountrySelect() {
  const [country, setCountry] = useState('US');
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  const countryOptions = [];



  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }



  const DropdownExampleSearchSelection = () => (
    <Dropdown
      placeholder='Select Country'
      fluid
      search
      onChange
      selection={e => setCountry(e.target.value)}

      options={countryOptions}
    />

  );

  data.countries.map(country => (
    countryOptions.push( { key: country.code, value: country.code, flag: country.code.toString().toLowerCase(), text: country.name })
  ));
  return (
<div>

    <DropdownExampleSearchSelection/>
    <p>{country}</p>
</div>

  );
}

export default CountrySelect;

//ReactDOM.render(<CountrySelect />, document.getElementById('root'));
