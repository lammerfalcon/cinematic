<script setup lang="ts">
import Page from "../components/layout/Page.vue";
import Tabs from "../components/tabs.vue";
import {tabsMock} from "../mocks/tabs";
import {ref} from "vue";
import MainBanner from "../components/main-banner.vue";
import FlashNews from "../components/flash-news.vue";
import ContentRow from "../components/content-row.vue";

const activeTab = ref<string>(tabsMock[0].id)
const onTabChange = (tabId: string) => {
  activeTab.value = tabId
}
</script>
<template>
  <page>
    <template #title> Home</template>
    <div>
      <tabs @on-tab-change="onTabChange" :tabs="tabsMock" :activetab=activeTab></tabs>
    </div>
    <div
        class="flex"
    >
      <content-row>
        <main-banner />
        <div class="ml-6 max-w-md w-full">
          <flash-news />

        </div>
      </content-row>
    </div>
  </page>
</template>


<style scoped>

</style>
