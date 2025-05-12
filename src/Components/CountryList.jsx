import React, { useEffect, useState } from "react";
import { getService } from "./Services/service";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CheckBox from "./CheckBox";

function CountryList() {
  const [countriesData, setCountriesData] = useState([]);
  const [filteredCountriesData, setFilteredCountriesData] = useState([]);
  const [regions, setRegions] = useState([]); // Updated to an array for multiple selections
  const [countryName, setCountryName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isIndependent, setIsIndependent] = useState("");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  useEffect(() => {
    getService().then((response) => {
      const countries = response.data;
      setCountriesData(countries);
      setFilteredCountriesData(countries);
    });
  }, []);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;

    setRegions((prevRegions) => {
      if (prevRegions.includes(selectedRegion)) {
        return prevRegions.filter((region) => region !== selectedRegion);
      } else {
        return [...prevRegions, selectedRegion];
      }
    });
    setIsSearchPerformed(true);
  };

  const handleNameChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleIndependentChange = (e) => {
    const selectedValue = e.target.value;
    if (isIndependent === selectedValue) {
      setIsIndependent(""); // Deselect
    } else {
      setIsIndependent(selectedValue);
    }
    setIsSearchPerformed(true);
  };

  useEffect(() => {
    let filteredCountries = countriesData;

    // Filter countries by selected regions and name
    if (regions.length > 0) {
      filteredCountries = filteredCountries.filter((country) =>
        regions.includes(country.region)
      );
    }

    if (countryName !== "") {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      );
    }

    // Apply sorting based on the selected sort criteria
    if (sortBy === "population") {
      filteredCountries.sort((a, b) => a.population - b.population);
    } else if (sortBy === "area") {
      filteredCountries.sort((a, b) => a.area - b.area);
    } else if (sortBy === "name") {
      filteredCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (sortBy === "independent") {
      filteredCountries.sort((a, b) => {
        if (a.independent === b.independent) return 0;
        return a.independent ? -1 : 1;
      });
    }

    if (isIndependent === "true") {
      filteredCountries = filteredCountries.filter(
        (country) => country.independent
      );
    } else if (isIndependent === "false") {
      filteredCountries = filteredCountries.filter(
        (country) => !country.independent
      );
    }

    setFilteredCountriesData(filteredCountries);
  }, [regions, countryName, countriesData, sortBy, isIndependent]);

  const countriesInRegion = filteredCountriesData.length;

  return (
    <div className="absolute bg-[#1B1D1F]">
      <div className="mx-[2.5vw] w-[95vw] h-full border border-[#282B30] bg-[#1B1D1F]  relative bottom-35 md:bottom-25 lg:bottom-17 rounded-xl pt-7 ">
        <div className="px-4">
          <div className="md:flex justify-end ">
            <div className="flex flex-1 items-center">
              <p className="semi-bold pb-2 ">
                Found {filteredCountriesData.length} countries
              </p>
            </div>

            <div className="py-5 flex flex-1 items-center md:justify-around medium">
              <MagnifyingGlassIcon
                className="size-8.5  z-20 absolute py-2.5 px-2  md:right-[37.9vw] lg:right-[38.7vw] xl:right-[38.8vw] 2xl:right-[39.6vw]"
                style={{ stroke: "#D2D5DA", strokeWidth: 2.5 }}
              />
              <input
                className=" bg-[#282B30] w-full md:w-[35vw] py-2.5 pl-9 rounded-2xl   focus:border-none focus:outline-[#D2D5DA]  "
                type="text"
                placeholder="Search by Name, Region, Subregion .."
                onChange={handleNameChange}
                onKeyUp={() => setIsSearchPerformed(true)}
              />
            </div>
          </div>

          <div className="md:flex gap-6">
            <div>
              <div className="pt-3">
                <p className="small pb-2">Sort by</p>
                <select
                  className="w-full p-2 rounded-xl outline-solid outline-[#282B30] medium"
                  onChange={handleSortChange}
                >
                  <option value="population">Population</option>
                  <option value="area">Area</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div className="pt-7 pb-2.5">
                <p className="small"> Region</p>
                <div className="medium">
                  {[
                    "Americas",
                    "Antarctic",
                    "Africa",
                    "Asia",
                    "Europe",
                    "Oceania",
                  ].map((region) => (
                    <button
                      key={region}
                      className={`${
                        regions.includes(region) ? "bg-[#282B30] " : "bg-none "
                      } px-5 py-1.5 mr-4 mb-3 rounded-xl `}
                      value={region}
                      onClick={handleRegionChange}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="small pb-2">Status</p>
                <div className="flex flex-col gap-1 medium">
                  <CheckBox
                    value="false"
                    checked={isIndependent === "false"}
                    label="Members of the United Nations"
                    onChange={handleIndependentChange}
                  />
                  <CheckBox
                    value="true"
                    checked={isIndependent === "true"}
                    label="Independent"
                    onChange={handleIndependentChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-[140%] ">
              <table className=" w-[100%] table-fixed border-spacing-[2rem] border-separate  ">
                <thead className="  pb-4 ">
                  <tr className="text-left pb-6 ">
                    <th className="small  py-2 w-[20%]">Flag</th>
                    <th className=" small py-2 w-[20%]">Name</th>
                    <th className=" small py-2 w-[20%]">Population</th>
                    <th className="small py-2 w-[20%]">Area (km²)</th>
                    <th className=" small lg:block hidden  py-2 w-[20%]">
                      Region
                    </th>
                  </tr>
                </thead>

                <tbody className="border-t-2 border-[#282B30] semi-bold pt-4">
                  {filteredCountriesData.map((country) => (
                    <tr key={country.cca3}>
                      <td>
                        <Link to={`/countries/${country.cca3}`}>
                          <img
                            src={country.flags.png}
                            alt={`${country.name.common} flag`}
                            width="50"
                          />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/countries/${country.cca3}`}>
                          {country.name.common}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/countries/${country.cca3}`}>
                          {country.population.toLocaleString() || "N/A"}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/countries/${country.cca3}`}>
                          {country.area.toLocaleString() || "N/A"}
                        </Link>
                      </td>
                      <td className="lg:block hidden">
                        <Link to={`/countries/${country.cca3}`}>
                          {country.region}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* end */}
    </div>
  );
}

export default CountryList;
