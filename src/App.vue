<script setup>
import { ref } from "vue"
import WeatherSearch from "./components/WeatherSearch.vue"
import WeatherResult from "./components/WeatherResult.vue"

const city = ref("Łódź")

const handleSearch = (value) => {
  city.value = value.trim()
}
</script>

<template>
  <div class="container">
    <h1>Sprawdź aktualną pogodę 🌤️</h1>
    <WeatherSearch @search="handleSearch" />
    <WeatherResult :city="city" />
    <p class="tech-stack">
      Built with Vue 3 and OpenWeather API
    </p>
  </div>
</template>

