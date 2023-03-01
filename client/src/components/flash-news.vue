<script setup lang="ts">
import Stack from "./stack.vue";
import {flashNews} from "../mocks/news";
import {ArrowRightIcon, ArrowLeftIcon} from '@heroicons/vue/24/solid'
import {computed, ref} from "vue";

interface FlashNews {
  id: number;
  rotate: number;
  image: string;
  text: string;
  date: string;
}

const isBackDirection = ref<boolean>(false)
const currentSlideIndex = ref<number>(0)
const currentSlide = computed(() => flashNews[currentSlideIndex.value])
const isLastSlide = computed(() => currentSlideIndex.value >= flashNews.length - 1)

const nextSlide = () => {
  if (isLastSlide.value) return
  toggleLoading()
  isBackDirection.value = false
  currentSlideIndex.value++
}
const prevSlide = () => {
  if (currentSlideIndex.value === 0) return
  toggleLoading()
  isBackDirection.value = true
  currentSlideIndex.value--
}

const loading = ref<boolean>(false)
const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
}
</script>
<template>
  <stack>
    <transition :name="!isBackDirection ? 'slide-fade' : 'slide-fade-reverse'">
      <div v-show="!loading" class="w-full h-full bg-white rounded-2xl p-6 drop-shadow-md rotate-3">
        <div class="news-top">
          <img class="rounded-2xl" :src="currentSlide.image" alt="flash news poster">
          <h2 class="text-oranje mt-2 font-bold text-lg">🔥 Hot news</h2>
          <p class="mt-2 font-bold">{{ currentSlide.text }}</p>
        </div>
        <div class="news-footer mt-2 flex">
          <p class="text-gray-400 w-full">{{ currentSlide.date }}</p>
          <p class="text-gray-900 flex">
            <ArrowLeftIcon
                v-if="currentSlideIndex > 0"
                @click="prevSlide"
                class="w-6 mr-2"
            />
            {{ currentSlideIndex + 1 }}/{{ flashNews.length }}
            <ArrowRightIcon
                v-if="!isLastSlide"
                @click="nextSlide"
                class="w-6 ml-2"
            />
          <div v-else class="w-6 ml-2"></div>
          </p>
        </div>
      </div>
    </transition>
  </stack>
</template>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active,
.slide-fade-reverse-enter-active,
.slide-fade-reverse-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateX(100px) ;
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-100px) ;
  opacity: 0;
}
.slide-fade-reverse-enter {
  transform: translateX(-100px) ;
  opacity: 0;
}
.slide-fade-reverse-leave-to {
  transform: translateX(100px) rotate(6deg);
  opacity: 0;
}

</style>
