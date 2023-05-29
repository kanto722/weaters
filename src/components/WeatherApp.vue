<template>
  <v-container>
    <v-row
      class="text-center d-flex flex-column justify-center"
      style="gap: 10px"
    >
      {{ dateBuilder() }}
      <form action="#" @submit="axiosWeather">
        <input type="text" placeholder="Введите город" v-model="query" />
        <v-btn type="submit">кнопка</v-btn>
      </form>
      <v-col cols="12 d-flex flex-wrap justify-center" style="gap: 20px">
        <v-card
          variant="tonal"
          v-for="card in info"
          :key="card.id"
          class="card d-flex flex-column justify-space-between align-center pa-2"
        >
          <v-card-title>г. {{ card.name }}</v-card-title>
          <v-card-text>
            <div v-if="card.main.temp">
              <span>Температура {{ card?.main?.temp.toFixed(0) }}</span>
            </div>
            <div v-if="card.main.humidity">
              <span>Влажность воздуха {{ card?.main?.humidity }}%</span>
            </div>
            <div v-if="card.wind.speed">
              <span>Скорость ветра {{ card?.wind?.speed.toFixed(0) }}м/с</span>
            </div>
            <div v-if="card.clouds.all">
              <span>Облачность {{ card?.clouds?.all }} %</span>
            </div>
            <div v-if="card.weather[0].description" class="d-flex justify-center flex-column align-center">
              <span>{{ card?.weather[0]?.description }}</span>
              <img
                :src="`https://openweathermap.org/img/wn/${card?.weather[0]?.icon}.png`"
                alt=""
              />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="deleteCity(card.name)">Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getWeatherByCity } from "@/services/weather";
export default {
  name: "WeatherApp",

  data() {
    return {
      query: "",
      info: [],
    };
  },

  methods: {
    axiosWeather(e) {
      e.preventDefault();
      getWeatherByCity(this.query)
        .then((result) => {
          this.info = this.info.concat(result);
          localStorage.setItem(
            "cities",
            JSON.stringify(this.info.map((item) => item.name))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    weatherRequest() {
      const citiesString = localStorage.getItem("cities");
      const cities = JSON.parse(citiesString);
      if (cities?.length) {
        Promise.all(cities.map(getWeatherByCity))
          .then((result) => {
            this.info = result;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteCity(city) {
      this.info = this.info.filter((item) => item.name !== city);
      localStorage.setItem(
        "cities",
        JSON.stringify(this.info.map((item) => item.name))
      );
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
  },
  mounted() {
    this.weatherRequest();
    setInterval(() => {
      this.weatherRequest();
    }, 100000);
  },
};
</script>
