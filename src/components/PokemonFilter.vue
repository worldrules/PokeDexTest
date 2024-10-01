<template>
  <div class="filter-container">
    <input v-model="searchQuery" @input="emitSearch" :placeholder="$t('search_placeholder')" />

    <div class="type-filter">
      <button v-for="(color, type) in pokemonTypeColors" :key="type" :class="{ active: selectedTypes.includes(type) }"
        @click="toggleTypeFilter(type)" :style="{ backgroundColor: color }">
        {{ type }}
      </button>
    </div>

    <div class="selected-types">
      <span v-if="selectedTypes.length">Tipos selecionados: {{ selectedTypes.join(', ') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const searchQuery = ref('');
    const selectedTypes = ref<string[]>([]);
    const pokemonTypeColors = {
      bug: '#A8B820',
      dark: '#705848',
      dragon: '#7038F8',
      electric: '#F8D030',
      fairy: '#EE99AC',
      fighting: '#C03028',
      fire: '#F08030',
      flying: '#A890F0',
      ghost: '#705898',
      grass: '#78C850',
      ground: '#E0C068',
      ice: '#98D8D8',
      normal: '#A8A878',
      poison: '#A040A0',
      psychic: '#F85888',
      rock: '#B8A038',
      steel: '#B8B8D0',
      water: '#6890F0',
    };

    const emitSearch = () => {
      emit('update:search', searchQuery.value);
    };

    const toggleTypeFilter = (type: string) => {
      if (selectedTypes.value.includes(type)) {
        selectedTypes.value = selectedTypes.value.filter(t => t !== type);
      } else {
        selectedTypes.value.push(type);
      }
      emit('update:types', selectedTypes.value);
    };

    return {
      searchQuery,
      pokemonTypeColors,
      selectedTypes,
      emitSearch,
      toggleTypeFilter,
    };
  },
});
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
  text-align: center;
}

input {
  padding: 10px;
  font-size: 16px;
}

.type-filter {
  margin-top: 10px;
}

button {
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

button.active {
  border: 2px solid #fff;
}
</style>
