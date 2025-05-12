import axios from "axios";

const URL = "https://restcountries.com/v3.1";

export const getService = () => {
  return axios.get(`${URL}/all`);
};

export function getCountryDetails(countryCode) {
  return axios.get(`${URL}/alpha/${countryCode}`);
}
