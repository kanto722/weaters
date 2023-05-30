import {BASE_URL, API_KEY} from "@/utils/consts.js"
import axios from 'axios'

export const getWeatherByCity = (city, units) => {
    console.log(units);
    return axios
    .get(
      `${BASE_URL}weather?q=${city}&APPID=${API_KEY}&lang=ru&units=${units || 'metric'}`
    )
    .then((res) => res.data);

}