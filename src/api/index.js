import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    try {
        let modifiedUrl = url
        if (country && country !== 'global') {
            modifiedUrl += '/countries/' + country;
            console.log('modified url:', modifiedUrl);
        }
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(modifiedUrl);
        return { confirmed, recovered, deaths, lastUpdate };
    }
    catch (error) {
        alert('Error in fetching data');
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error) {
        alert('Error in fetching data');
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountryData = async (country) => {
    try {
        let modifiedUrl = url
        modifiedUrl += '/countries/' + country + '/confirmed';
        console.log('modified url:', modifiedUrl);
        const { data } = await axios.get(modifiedUrl);
        const modifiedData = data.map((stateData) => ({
            state: stateData.provinceState,
            confirmed: stateData.confirmed,
            recovered: stateData.recovered,
            deaths: stateData.deaths,
        }));
        return modifiedData.sort((a, b) => b.confirmed - a.confirmed);
    } catch (error) {
        console.log(error);
    }
}