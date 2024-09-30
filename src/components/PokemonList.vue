<template>
  <div class="pokemon-list">
    <PokemonCard
      v-for="pokemon in pokemonList"
      :key="pokemon.name"
      :pokemon="pokemon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { usePokemon } from '@/composables/usePokemon';
import PokemonCard from './PokemonCard.vue';

export default defineComponent({
  components: { PokemonCard },
  setup() {
    const { pokemonList, getPokemonList } = usePokemon();

    onMounted(() => {
      getPokemonList();
    });

    return {
      pokemonList,
    };
  },
});
</script>

<style scoped>
.pokemon-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
