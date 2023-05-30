<template>
  <v-container>
    <v-row
      class="text-center d-flex flex-column justify-center"
      style="gap: 10px"
    >
      {{ dateBuilder() }}
      <form action="#" @submit="axiosWeather">
        <input type="text" placeholder="Введите город" v-model="query" />
        <v-select
          label="Температура в Градусах"
          :items="units"
          :item-text="'label'"
          variant="solo-inverted"
          name="unit"
        ></v-select>
        <v-btn type="submit">кнопка</v-btn>
      </form>
      <v-col cols="12 d-flex flex-wrap justify-center" style="gap: 20px">
        <v-card
          variant="tonal"
          v-for="card in info"
          :key="card.id"
          class="card d-flex flex-column justify-space-between align-center pa-2"
          style="max-width: 280px"
        >
          <card-component
            :name="card.name"
            :temp="card?.main?.temp"
            :humidity="card?.main?.humidity"
            :speed="card?.wind?.speed"
            :all="card?.clouds?.all"
            :description="card?.weather[0]?.description"
            :icon="card?.weather[0]?.icon"
          />
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
import CardComponent from "./CardComponent.vue";
export default {
  name: "WeatherApp",
  components: {
    CardComponent,
  },
  data() {
    return {
      info: [],
      query: "",
      units: [
        { value: "standart", label: "Келивин" },
        { value: "imperial", label: "Фаренгейт" },
        { value: "metric", label: "Цельсия" },
      ],
    };
  },

  methods: {
    axiosWeather(e) {
      e.preventDefault();
      const cityString = this.info.map((item) => item.name);
      console.log(cityString);
      const findCity = cityString.find(
        (elem) => elem.toLowerCase() === this.query.toLowerCase()
      );
      const formData = new FormData(e.target);
      const unit = formData.get("unit");

      if (findCity) {
        return alert("Город уже показан в карточке");
      }
      getWeatherByCity(this.query, unit)
        .then((result) => {
          this.info = this.info.concat(result);
          localStorage.setItem(
            "cities",
            JSON.stringify(this.info.map((item) => item.name))
          );
          this.query = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    weatherRequest() {
      const citiesString = localStorage.getItem("cities");
      const cities = JSON.parse(citiesString);
      if (cities?.length) {
        Promise.all(cities.map((value) => getWeatherByCity(value)))
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
