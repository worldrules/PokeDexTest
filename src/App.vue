<template>
  <div id="app">
    <div class="theme-language-container">
      <input type="checkbox" class="checkbox" id="theme-toggle" @click="toggleTheme" />
      <label for="theme-toggle" class="checkbox-label">
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
        <span class="ball"></span>
      </label>
      <span class="theme">{{ $t('toggle_theme') }}</span>

      <select @change="changeLanguage" v-model="currentLanguage" class="language-select">
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
    <h1>{{ $t('welcome') }}</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTheme } from '@/composables/useTheme';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { toggleTheme } = useTheme();
    const { locale } = useI18n();
    const currentLanguage = ref(locale.value);

    const changeLanguage = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      locale.value = target.value;
      currentLanguage.value = target.value;
    };

    return {
      toggleTheme,
      currentLanguage,
      changeLanguage,
    };
  },
});
</script>

<style>
.theme-language-container {
  display: flex;
  align-items: center;
}

.language-select {
  margin-left: 10px;
}

.theme-language-container span {
  color: black;
}

body.dark .theme-language-container span {
  color: white;
}
</style>
