<template>
  <div id="app">
    <div class="navbar">
      <select @change="changeLanguage" v-model="currentLanguage" class="language-select">
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
      <button @click="toggleTheme" class="navbar-button">{{ $t('toggle_theme') }}</button>
      <router-link to="/favorites" class="navbar-button">{{ $t('favorites') }}</router-link>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTheme } from './composables/useTheme';
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
.navbar {
  display: flex;
  justify-content: center;
  background-color: #fef68a;
  /* Amarelo */
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.language-select {
  margin-right: 10px;
  border: none;
  padding: 10px;
  border-radius: 5px;
}

.navbar-button {
  background-color: #f08030;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin: 0 5px;
  /* Espaço entre os botões */
  transition: background-color 0.3s;
}

.navbar-button:hover {
  background-color: #d86f27;
  color: white;
}
</style>
