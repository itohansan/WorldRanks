import React, { useState } from "react";
import Hero from "../Components/Hero";

import CountryList from "../Components/CountryList";

const CountryRankingPage = () => {
  const [countries, setCountries] = useState([]);
  return (
    <div>
      <Hero />
      <CountryList />
    </div>
  );
};

export default CountryRankingPage;
