<template>
  <div class="pokemon-list-container">
    <PokemonFilter @update:search="setSearchQuery" />

    <div class="pokemon-list">
      <PokemonCard
        v-for="(pokemon, index) in displayedPokemonList"
        :key="pokemon.name"
        :pokemon="pokemon"
        :pokemonId="getPokemonId(pokemon.url)"
      />
    </div>

    <div v-if="displayedPokemonList.length > 0" class="pagination">
      <button @click="prevPage" :disabled="offset === 0">Anterior</button>
      <span>Página {{ currentPage }}</span>
      <button @click="nextPage" :disabled="!hasMorePokemon">Próxima</button>
    </div>

    <div v-if="!displayedPokemonList.length" class="no-results">Nenhum Pokémon encontrado.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { usePokemon } from '@/composables/usePokemon';
import PokemonCard from './PokemonCard.vue';
import PokemonFilter from './PokemonFilter.vue';

export default defineComponent({
  components: { PokemonCard, PokemonFilter },
  setup() {
    const {
      pokemonList,
      fetchAllPokemons,
      totalPokemon,
      offset,
      limit,
    } = usePokemon();

    const searchQuery = ref('');

    const setSearchQuery = (query: string) => {
      searchQuery.value = query.toLowerCase();
    };

    const displayedPokemonList = computed(() => {
      if (!searchQuery.value.trim()) {
        return pokemonList.value;
      }

      return pokemonList.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.value)
      );
    });

    const currentPage = computed(() => (offset.value / limit) + 1);
    const hasMorePokemon = computed(() => offset.value + limit < totalPokemon.value);

    const nextPage = () => {
      if (hasMorePokemon.value) {
        offset.value += limit;
        fetchAllPokemons();
      }
    };

    const prevPage = () => {
      if (offset.value > 0) {
        offset.value -= limit;
        fetchAllPokemons();
      }
    };

    onMounted(() => {
      fetchAllPokemons();
    });

    const getPokemonId = (url: string) => {
      const segments = url.split('/');
      return segments[segments.length - 2];
    };

    return {
      displayedPokemonList,
      currentPage,
      nextPage,
      prevPage,
      hasMorePokemon,
      getPokemonId,
      setSearchQuery,
    };
  },
});
</script>

<style scoped>
.pokemon-list-container {
  text-align: center;
}
.pokemon-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.pagination {
  margin-top: 20px;
}
.no-results {
  margin-top: 20px;
  font-size: 18px;
  color: red;
}
button {
  padding: 10px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>
