import {BASE_URL, API_KEY} from "@/utils/consts.js"
import axios from 'axios'

export const getWeatherByCity = (city) => {
    return axios
    .get(
      `${BASE_URL}weather?q=${city}&units=metric&APPID=${API_KEY}&lang=ru`
    )
    .then((res) => res.data);

}