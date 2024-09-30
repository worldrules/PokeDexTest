<template>
  <div class="pokemon-list-container">
    <PokemonFilter @update:search="setSearchQuery" />
    <div class="pokemon-list">
      <PokemonCard
        v-for="pokemon in filteredPokemonList"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { usePokemon } from '@/composables/usePokemon';
import PokemonCard from './PokemonCard.vue';
import PokemonFilter from './PokemonFilter.vue';

export default defineComponent({
  components: { PokemonCard, PokemonFilter },
  setup() {
    const { pokemonList, getPokemonList } = usePokemon();
    const searchQuery = ref('');

    const setSearchQuery = (query: string) => {
      searchQuery.value = query.toLowerCase();
    };

    const filteredPokemonList = computed(() =>
      pokemonList.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.value)
      )
    );

    getPokemonList();

    return {
      pokemonList,
      filteredPokemonList,
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
</style>
