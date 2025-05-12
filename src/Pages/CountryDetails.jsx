import Hero from "../Components/Hero";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCountryDetails } from "../Components/Services/service";

const CountryDetails = () => {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});
  const [neighborCountries, setNeighborCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCountryDetails(countryCode).then((res) => {
      const result = res.data;
      setDetail(result[0] || {});
    });
  }, [countryCode]);

  useEffect(() => {
    if (detail.borders && Array.isArray(detail.borders)) {
      Promise.all(
        detail.borders.map((borderCode) =>
          getCountryDetails(borderCode).then((res) => {
            const countryData = res.data[0];
            return {
              name: countryData.name.common,
              flag: countryData.flags.png,
              code: countryData.cca3,
            };
          })
        )
      ).then((countries) => {
        const sortedCountries = countries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setNeighborCountries(sortedCountries);
      });
    }
  }, [detail]);

  return (
    <div className="w-full h-full bg-[#1B1D1F]  ">
      <div className="w-full">
        <Hero />
      </div>
      <div className="w-full">
        <div className="relative bottom-20  bg-[#1B1D1F] w-full sm:w-[640px] h-auto mx-auto pt-4 pb-14 border border-[#282B30] rounded-2xl">
          <div className="relative pb-[9.3rem] smaller-padding">
            {detail.flags && typeof detail.flags === "object" && (
              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 -translate-y-1">
                <img
                  className="smaller-flag rounded-2xl w-[16rem] h-[12rem]"
                  src={detail?.flags?.png}
                  alt="Country Flag"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center pb-3">
            <h1 className="font-semibold text-[2rem] sm:text-3xl text-center">
              {detail?.name?.common || "Unknown Country"}
            </h1>
            <p className="text-center sm:text-lg">
              {detail?.name?.official || "Unknown Official Name"}
            </p>
          </div>

          <div className="flex smaller justify-around  py-7 center">
            <div className="smaller-margin flex p-2 px-5 rounded-xl bg-[#282B30] ">
              <p className=" py-1 px-3 border-r border-[#1B1D1F] text-[0.875rem]">
                Population
              </p>
              <p className=" py-1 px-3 ">
                {detail.population?.toLocaleString() || "N/A"}
              </p>
            </div>
            <div className=" flex bg-[#282B30] p-2 px-5 rounded-xl">
              <p className=" py-1 px-3 border-r border-[#1B1D1F] text-[0.875rem]">
                Area(km²)
              </p>
              <p className=" py-1 px-3">
                {detail.area?.toLocaleString() || "N/A"}
              </p>
            </div>
          </div>

          <div className="text-[0.875rem] text-[D2D5DA]">
            <hr className="text-[#282B30]" />
            <div className="py-4   ">
              {detail.capital && (
                <div className="flex flex-row justify-between px-4">
                  <p>Capital</p>
                  <p>{detail.capital.join(", ") || "N/A"}</p>
                </div>
              )}
            </div>
            <hr className="text-[#282B30]" />
            <div className="py-4">
              {detail.subregion && (
                <div className="flex flex-row justify-between px-4">
                  <p>Sub region</p>
                  <p>{detail.subregion}</p>
                </div>
              )}
            </div>
            <hr className="text-[#282B30]" />
            <div className="py-4">
              {detail.languages && typeof detail.languages === "object" && (
                <div className="flex flex-row  justify-between px-4">
                  <div className="w-1/2">
                    <p className=" ">Languages</p>
                  </div>
                  <div className="">
                    <p className="flex-wrap">
                      {Object.values(detail.languages).join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <hr className="text-[#282B30]" />
            <div className="py-4">
              {detail.currencies && typeof detail.currencies === "object" && (
                <div className="flex flex-row justify-between px-4">
                  <p>Currencies</p>
                  {Object.values(detail.currencies).map((currency, index) => (
                    <p key={index}>{currency.name}</p>
                  ))}
                </div>
              )}
            </div>
            <hr className="text-[#282B30]" />
            <div className="py-4 px-4">
              {detail.continents && (
                <div className="flex flex-row justify-between">
                  <p>Continent</p>
                  <p>{detail.continents}</p>
                </div>
              )}
            </div>
            <hr className="text-[#282B30]" />

            {/* Neighboring Countries */}
            <div className="pb-4">
              {neighborCountries.length > 0 && (
                <div className="flex flex-col space-y-4 mt-4 px-4">
                  <p className="font-semibold">Neighboring Countries:</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborCountries.map((neighbor, index) => (
                      <Link key={index} to={`/countries/${neighbor.code}`}>
                        <div className="flex flex-col cursor-pointer">
                          <img
                            src={neighbor.flag}
                            alt={neighbor.name}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <p className="text-center text-[0.75rem]">
                            {neighbor.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
