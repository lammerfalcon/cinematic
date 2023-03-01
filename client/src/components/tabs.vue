<script lang="ts" setup>
import {Tab} from "../types";

defineProps<{
  tabs: Tab[],
  activetab: string;
}>()
const emits = defineEmits<{
  (e: 'on-tab-change', id: string): void
}>()
</script>
<template>
  <div>
    <nav class="flex space-x-4 px-4">
      <a
          @click="emits('on-tab-change', id)"
          class="rounded-lg bg-movie-black-200 px-4 py-2 text-white drop-shadow-xl hover:bg-oranje cursor-pointer"
          :class="id === activetab ? 'bg-oranje' : 'bg-movie-black-200'"
          v-for="{ id, emoji, title } in tabs"
          :key="id">
        {{ emoji }}
        {{ title }}
      </a>
    </nav>
  </div>
</template>
<style></style>

