<script setup>
import { ref } from "vue"

const emit = defineEmits(["search"])

const value = ref("")

const submit = () => {
  if (!value.value.trim()) return

  emit("search", value.value.trim())
}
</script>

<template>
  <form @submit.prevent="submit">
    <input
      v-model="value"
      type="text"
      placeholder="Wpisz miasto..."
    />
    <button>Szukaj</button>
  </form>
</template>