<template>
  <div class="pokemon-list-container">
    <PokemonFilter @update:search="setSearchQuery" @update:type="setTypeFilter" />

    <div class="pokemon-list" v-if="paginatedPokemonList.length">
      <PokemonCard v-for="pokemon in paginatedPokemonList" :key="pokemon.id" :pokemon="pokemon"
        :pokemonId="getPokemonId(pokemon.url)" @click="goToPokemonDetail(+getPokemonId(pokemon.url))"
        :is-favorite="favoritePokemons.includes(pokemon.id)" @toggle-favorite="toggleFavorite(pokemon.id)" />
    </div>

    <div class="pagination" v-if="paginatedPokemonList.length">
      <button @click="prevPage" :disabled="offset === 0">Anterior</button>
      <span>Página {{ currentPage }}</span>
      <button @click="nextPage" :disabled="!hasMorePokemon">Próxima</button>
    </div>

    <div v-if="!paginatedPokemonList.length && pokemonList.length" class="no-results">
      Nenhum Pokémon encontrado.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from 'vue';
import { usePokemon } from '@/composables/usePokemon';
import { useRouter } from 'vue-router';
import PokemonCard from './PokemonCard.vue';
import PokemonFilter from './PokemonFilter.vue';

export default defineComponent({
  components: { PokemonCard, PokemonFilter },
  setup() {
    const router = useRouter();
    const { pokemonList, fetchAllPokemons, limit, offset } = usePokemon();

    const searchQuery = ref('');
    const selectedTypes = ref<string[]>([]);
    const favoritePokemons = ref<number[]>([]);

    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem('favoritePokemons');
      if (storedFavorites) {
        favoritePokemons.value = JSON.parse(storedFavorites);
      }
    };

    const toggleFavorite = (pokemonId: number) => {
      const index = favoritePokemons.value.indexOf(pokemonId);
      if (index > -1) {
        favoritePokemons.value.splice(index, 1);
      } else {
        favoritePokemons.value.push(pokemonId);
      }
      localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons.value));
    };

    const setSearchQuery = (query: string) => {
      searchQuery.value = typeof query === 'string' ? query.trim() : '';
      offset.value = 0;
      fetchAllPokemons();
    };

    const setTypeFilter = (types: string[]) => {
      selectedTypes.value = types;
      searchQuery.value = '';
      offset.value = 0;
      console.log('Tipos selecionados:', selectedTypes.value);
      fetchAllPokemons();
    };

    const filteredPokemonList = computed(() => {
      let filteredList = pokemonList.value;

      if (searchQuery.value) {
        const queryAsNumber = Number(searchQuery.value);
        filteredList = filteredList.filter(pokemon => {
          if (!isNaN(queryAsNumber) && queryAsNumber > 0) {
            return pokemon.id === queryAsNumber;
          }
          return pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        });
      }

      if (selectedTypes.value.length > 0) {
        filteredList = filteredList.filter(pokemon =>
          pokemon.types.some((type: { type: { name: string; }; }) => selectedTypes.value.includes(type.type.name))
        );
      }

      return filteredList;
    });

    const paginatedPokemonList = computed(() => {
      const start = offset.value;
      const end = start + limit;
      return filteredPokemonList.value.slice(start, end);
    });

    const goToPokemonDetail = (id: number) => {
      router.push({ name: 'PokemonDetail', params: { id } });
    };

    const getPokemonId = (url: string) => {
      const segments = url.split('/');
      return segments[segments.length - 2];
    };

    const currentPage = computed(() => Math.floor(offset.value / limit) + 1);
    const hasMorePokemon = computed(() => offset.value + limit < filteredPokemonList.value.length);

    const nextPage = () => {
      if (hasMorePokemon.value) {
        offset.value += limit;
      }
    };

    const prevPage = () => {
      if (offset.value > 0) {
        offset.value -= limit;
      }
    };

    const loadInitialPokemons = async () => {
      await fetchAllPokemons();
      loadFavorites();
    };

    onMounted(() => {
      loadInitialPokemons();
    });

    watch(selectedTypes, (newTypes) => {
      console.log('Tipos selecionados:', newTypes);
      offset.value = 0;
    });

    return {
      paginatedPokemonList,
      currentPage,
      nextPage,
      prevPage,
      hasMorePokemon,
      getPokemonId,
      setSearchQuery,
      setTypeFilter,
      pokemonList,
      offset,
      goToPokemonDetail,
      selectedTypes,
      favoritePokemons,
      toggleFavorite,
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
