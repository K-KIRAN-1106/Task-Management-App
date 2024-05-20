<template>
  <the-index></the-index>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const TheIndex = defineAsyncComponent(() => import('@/pages/TheIndex.vue'));

export default {
  components: {
    TheIndex
  }
};
</script>