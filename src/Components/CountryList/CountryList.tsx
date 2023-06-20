import React, { useEffect, useState } from "react";
import "./CountryList.css";
import Loading from "../utils/Loading";

type Country = {
  name: string;
  region: string;
  area: number;
};

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [areaFilterActive, setAreaFilterActive] = useState(false);
  const [regionFilterActive, setRegionFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );
      const data = await response.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setSortedCountries(
      [...countries].sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [countries]);

  const filterByArea = () => {
    const lithuania = countries.find((country) => country.name === "Lithuania");
    if (lithuania) {
      const filtered = countries.filter(
        (country) => country.area < lithuania.area
      );
      setFilteredCountries(filtered);
      setAreaFilterActive(true);
      setRegionFilterActive(false);
    }
  };

  const filterByRegion = () => {
    const filtered = countries.filter(
      (country) => country.region === "Oceania"
    );
    setFilteredCountries(filtered);
    setAreaFilterActive(false);
    setRegionFilterActive(true);
  };

  const removeFilter = () => {
    setFilteredCountries([]);
    setAreaFilterActive(false);
    setRegionFilterActive(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedCountries = () => {
    const allCountries =
      filteredCountries.length > 0 ? filteredCountries : sortedCountries;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allCountries.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(
    filteredCountries.length > 0
      ? filteredCountries.length / itemsPerPage
      : sortedCountries.length / itemsPerPage
  );

  return (
    <div className="country-list-container">
      <section className="filter-btn-container">
        <div>
          <button
            onClick={filterByArea}
            className={`filter-btn ${areaFilterActive ? "active" : ""}`}
          >
            Filter by Area (Smaller than Lithuania)
          </button>
          <button
            onClick={filterByRegion}
            className={`filter-btn ${regionFilterActive ? "active" : ""}`}
          >
            Filter by Region (Oceania)
          </button>
        </div>
        <div>
          <button onClick={removeFilter} className="filter-remove-btn">
            Remove Filter
          </button>
        </div>
      </section>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <ul className="country-list">
            {getPaginatedCountries().map((country, index) => (
              <li key={index} className="country-list-item">
                <span className="country-info">
                  <strong>Name:</strong> {country.name}
                </span>
                <span className="country-info">
                  <strong>Region:</strong> {country.region}
                </span>
                <span className="country-info">
                  <strong>Area:</strong> {country.area}
                </span>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryList;
