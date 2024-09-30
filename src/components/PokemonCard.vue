<template>
  <div class="pokemon-card">
    <img :src="pokemonImage" :alt="pokemon.name" class="pokemon-image" />
    <h3>{{ pokemonId }} - {{ pokemon.name }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    pokemon: {
      type: Object as PropType<{ name: string; url: string }>,
      required: true,
    },
    pokemonId: {
      type: String,
      required: true,
    },
  },
  computed: {

    pokemonImage(): string {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId}.png`;
    },
  },
});
</script>

<style scoped>
.pokemon-card {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background-color: #f5f5f5;
}
.pokemon-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>
