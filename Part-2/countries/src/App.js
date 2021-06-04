import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./countries";
import Search from "./search";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  let filteredCountries

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(({ data }) => {
        setCountries(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const toggleShow = (e) => {
    setQuery(e.target.value)
  };

  filteredCountries = !query
    ? countries
    : countries.filter((country) =>
        country.name.toLowerCase().includes(query.toLocaleLowerCase())
      );
      
  return (
    <div>
      <Search query={query} setQuery={setQuery} />
      <Countries
        query={query}
        filteredCountries={filteredCountries}
        toggleShow={toggleShow}
      />
    </div>
  );
};

export default App;