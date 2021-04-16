import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData, fetchCountryData } from './api';
import { useState, useEffect } from 'react';
import coronaImage from './images/covid.jpg';

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
    }
    getData();
  }, []);

  const [country, setCountry] = useState('');

  const [countryData, setCountryData] = useState([]);

  const handleCountryChange = async (country) => {
    console.log(country);
    const data = await fetchData(country);
    const countryData = await fetchCountryData(country);
    setData(data);
    setCountry(country);
    setCountryData(countryData);
    // const fetchedData = await fetchData(country)
  }

  return (
    <div className={styles.container}>
      <img src={coronaImage} className={styles.logo} alt='logo' />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} countryData={countryData} />
    </div>
  );
}

export default App;
