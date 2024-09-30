<template>
  <div id="app">
    <div>
      <input type="checkbox" class="checkbox" id="theme-toggle" @click="toggleTheme" />
      <label for="theme-toggle" class="checkbox-label">
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
        <span class="ball"></span>
      </label>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from '@/composables/useTheme';

export default defineComponent({
  setup() {
    const { toggleTheme } = useTheme();
    return {
      toggleTheme,
    };
  },
});
</script>