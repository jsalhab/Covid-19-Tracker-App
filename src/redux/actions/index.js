import {FETCH_DATA, FETCH_DATA_DAILY, FETCH_CONTRIES} from "./types";
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = country => async (dispatch, getState) => {
  
    let changeableUrl = url;
    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    dispatch({ type: FETCH_DATA, payload: {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    }});

  } catch (error) {
    console.log(error);
  }
  
 
};

export const fetchDailyData = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    dispatch({tyep: FETCH_DATA_DAILY, payload:modifiedData});
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = () => async (dispatch, getState) => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};