<script setup lang="ts">
import {HomeIcon, FilmIcon, MagnifyingGlassIcon} from "@heroicons/vue/24/outline";
import {HomeIcon as HomeSolidIcon, FilmIcon as FilmSolidIcon, MagnifyingGlassIcon as MagnifyingGlassIconSolid} from "@heroicons/vue/24/solid";
import {useRoute} from "vue-router";

const menu = [
  {
    to: '/',
    icon: HomeIcon,
    activeIcon: HomeSolidIcon,
  },
  {
    to: '/movies/1',
    icon: FilmIcon,
    activeIcon: FilmSolidIcon,
  },
  {
    to: '/search',
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
  },
]
const route = useRoute()
</script>
<template>
  <nav class="block bg-movie-black-200">
    <div class="relative flex w-30 flex-col p-10 space-y-3">
      <router-link
          class="flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg hover:bg-movie-black-400"
          :key="to"
          v-for="{to, icon, activeIcon} in menu"
          :to="to"
          :class="[route.path === to ? 'bg-movie-black-400 text-white' : 'text-gray-600']"
          :active-class="[]"
      >
        <component class="h-6 w-6" :is="route.path === to ? activeIcon : icon"/>
      </router-link>
    </div>
  </nav>
</template>
