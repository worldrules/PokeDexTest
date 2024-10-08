<template>
  <div class="filter-container">
    <input class="searchTerm" v-model="searchQuery" @input="emitSearch" :placeholder="$t('search_placeholder')" />

    <div class="type-filter">
      <button v-for="(color, type) in pokemonTypeColors" :key="type" :class="{ active: selectedTypes.includes(type) }"
        @click="toggleTypeFilter(type)" :style="{ backgroundColor: color }">
        {{ capitalizeFirstLetter(type) }}
      </button>
    </div>

    <div class="selected-types" v-if="selectedTypes.length">
      {{ $t('selected_types') }}: {{ selectedTypes.join(', ') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

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

    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const toggleTypeFilter = (type: string) => {
      const index = selectedTypes.value.indexOf(type);
      if (index > -1) {
        selectedTypes.value.splice(index, 1);
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
      capitalizeFirstLetter
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

.search {
  margin-top: 10px;
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
