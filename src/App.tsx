import React from "react";
import CountryList from "./Components/CountryList/CountryList";

const App: React.FC = () => {
  return (
    <div>
      <h3 style={{ padding: "20px" }}>Country List</h3>
      <CountryList />
    </div>
  );
};

export default App;
