<template>
  <div class="filter">
    <input v-model="searchQuery" placeholder="Pesquisar Pokémon..." />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const searchQuery = ref('');

    return {
      searchQuery,
    };
  },
});
</script>

<style scoped>
.filter {
  margin-bottom: 20px;
  text-align: center;
}
input {
  padding: 10px;
  font-size: 16px;
}
</style>
