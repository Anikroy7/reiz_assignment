import React, { useEffect, useState } from "react";
import "./CountryList.css";
type Country = {
  name: String;
  region: String;
  area: String;
};

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [areaFilterActive, setAreaFilterActive] = useState(false);
  const [regionFilterActive, setRegionFilterActive] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSortedCountries(
      [...countries].sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [countries]);

  return (
    <section className="country-list-container">
      <section className="filter-btn-container">
        <div>
          <button className={`filter-btn ${areaFilterActive ? "active" : ""}`}>
            Filter by Area (Smaller than Lithuania)
          </button>
          <button
            className={`filter-btn ${regionFilterActive ? "active" : ""}`}
          >
            Filter by Region (Oceania)
          </button>
        </div>
        <div>
          <button className="filter-remove-btn">Remove Filter</button>
        </div>
      </section>

      {sortedCountries.map((country, index) => (
        <ul className="country-list">
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
        </ul>
      ))}
    </section>
  );
};

export default CountryList;
