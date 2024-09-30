<template>
  <div id="app">
    <button @click="toggleTheme">Dark Mode</button>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from '@/composables/useTheme';
import './assets/styles.css';

export default defineComponent({
  setup() {
    const { toggleTheme } = useTheme();
    return {
      toggleTheme,
    };
  },
});
</script>
