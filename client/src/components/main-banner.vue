<script setup lang="ts">
import {ref} from "vue";

interface Banner {
  title: string;
  plot: string;
  year: string;
  id: string;
  genre: string;
  duration: string;
  poster: string;
}
const bannerMock: Banner = {
  title: 'Interstellar',
  plot: 'Earth\'s future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind\'s survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.',
  year: '2014',
  id: '1',
  genre: 'Fiction',
  duration: '1h 53min',
  poster: 'https://qph.cf2.quoracdn.net/main-qimg-315a3e21b5548aaf8dc7f97c981a1ff0-pjlq'
}
const bg = ref<string>(`url(${bannerMock.poster})`)
</script>
<template>
  <div class="banner flex p-8 w-full cursor-pointer rounded-2xl drop-shadow-xl">
    <div class="text-white self-end">
      <h1 class="text-4xl mb-2 font-bold">{{ bannerMock.title }}</h1>
      <p>{{ bannerMock.plot }}</p>
      <div class="mt-6 flex gap-6">
        <span>{{ bannerMock.year }}</span>
        <span>{{ bannerMock.genre }}</span>
        <span>{{ bannerMock.duration }}</span>
      </div>
    </div>
  </div>
</template>
<style>
.banner {
  background: linear-gradient(rgba(255,255,255, 0%), #262c31), v-bind(bg);
  background-size: cover;
}
</style>
