import React, { useEffect, useState } from "react";

type Country = {
  name: String;
  region: String;
  area: String;
};

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

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

  return <div>All CountryList</div>;
};

export default CountryList;
