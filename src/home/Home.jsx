import React, { useState, useEffect } from 'react';
import "../styles/home.css";
import pattern from "../assets/pattern-divider-desktop.svg";
import dicelogo from "../assets/icon-dice.svg";
import patternmobile from "../assets/pattern-divider-mobile.svg";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Function to fetch data
  const fetchData = () => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <main id="body">
      <div id="advise">
        <h5 className="advise">ADVISE #117</h5>
        {!isLoading && data && (
          <p>
            <q>
              {data.slip.advice.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </q>
          </p>
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <img src={pattern} alt="" width={390} id="pattern" />
        <img src={patternmobile} alt="" id="patternmobile" />
        <button id="dice" onClick={handleClick}>
          <img src={dicelogo} alt="" />
        </button>
      </div>
    </main>
  );
};

export default Home;

