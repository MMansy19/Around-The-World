import { useEffect, useState } from "react";

export const useFetchData = (country) => {
  const [result, setResult] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (country) {
      fetchDataFromAPI();
    } else {
      fetchDataFromLocalstorage();
    }
  }, []);

  const processCountriesData = (data) => {
    // Filter out Israel from the countries list
    const filteredData = Array.isArray(data) 
      ? data.filter(item => 
          item.name && 
          item.name.common.toLowerCase() !== 'israel'
        )
      : data;

    if (country) {
      // Country page
      setResult(Array.isArray(filteredData) ? filteredData[0] : filteredData);
    } else {
      // Homepage
      setResult(filteredData);
      setFilteredCountries(filteredData);
      localStorage.setItem("countries", JSON.stringify(filteredData));
    }
  };

  const fetchDataFromAPI = () => {
    let url = "https://restcountries.com/v3.1/all";

    setIsLoading(true);

    if (country) {
      url = `https://restcountries.com/v3.1/name/${country}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then(processCountriesData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const fetchDataFromLocalstorage = () => {
    const data = JSON.parse(localStorage.getItem("countries"));

    if (data) {
      processCountriesData(data);
    } else {
      fetchDataFromAPI();
    }
  };

  return {
    result,
    filteredCountries,
    setFilteredCountries,
    isLoading,
    isError,
  };
};
