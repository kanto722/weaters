<template>
  <div class="card d-flex flex-column justify-space-between align-center pa-2">
    <v-card-title>г. {{ name }}</v-card-title>
    <v-card-text>
      <div v-if="temp">
        <span>Температура {{ temp.toFixed(0) }}</span>
      </div>
      <div v-if="humidity">
        <span>Влажность воздуха {{ humidity }}%</span>
      </div>
      <div v-if="speed">
        <span>Скорость ветра {{ speed.toFixed(0) }}м/с</span>
      </div>
      <!-- проверить - почему не выводится -->
      <div v-if="all">
        <span>Облачность {{ all }} %</span>
      </div>
      <div
        v-if="description"
        class="d-flex justify-center flex-column align-center"
      >
        <span>{{ description }}</span>
        <img :src="`https://openweathermap.org/img/wn/${icon}.png`" alt="" />
      </div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "CardComponent",

  props: {
    name: String,
    temp: Number,
    humidity: Number,
    speed: Number,
    all: Number,
    description: String,
    icon: String,
  },
};
</script>

<style></style>
