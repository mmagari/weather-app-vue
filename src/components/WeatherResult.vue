<script setup>
import { ref, watch } from "vue"
import { formatLocationLocalTime } from "./time.js"

const props = defineProps({
  city: String
})

const weather = ref(null)
const loading = ref(false)
const error = ref(null)

const API_KEY = import.meta.env.VITE_WEATHER_KEY

const fetchWeather = async () => {
  if (!API_KEY) {
    error.value = "Brak klucza API"
    return
  }

  if (!props.city) return

  loading.value = true
  error.value = null

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${API_KEY}&units=metric&lang=pl`
    )

    if (!res.ok) throw new Error("Nie znaleziono miasta")

    const data = await res.json()
    weather.value = data

  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

watch(() => props.city, fetchWeather, { immediate: true })
</script>

<template>
  <div>
    <div v-if="loading">Ładowanie...</div>
    <div v-if="error">{{ error }}</div>

    <div v-if="weather">
      <h2>{{ weather.name }}</h2>
      <p>
        <strong>
          {{ formatLocationLocalTime(weather.dt, weather.timezone) }}
        </strong>
      </p>

      <img
        :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        :alt="weather.weather[0].description"
      />

      <p><strong>Temperatura:</strong> {{ weather.main.temp }}°C</p>
      <p><strong>Odczuwalna:</strong> {{ weather.main.feels_like }}°C</p>
      <p><strong>Wilgotność:</strong> {{ weather.main.humidity }}%</p>
      <p><strong>Warunki:</strong> {{ weather.weather[0].description }}</p>
    </div>
  </div>
</template>