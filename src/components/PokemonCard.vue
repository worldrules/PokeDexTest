<template>
  <div class="pokemon-card">
    <router-link :to="{ name: 'PokemonDetail', params: { id: pokemonId } }">
      <img :src="pokemonImage" :alt="pokemon.name" class="pokemon-image" />
      <h2 class="pokemon-name">{{ pokemonId }} - {{ pokemon.name }}</h2>
    </router-link>
    <button @click.stop="toggleFavorite">
      <i :class="['fas', isFavorite ? 'fa-star' : 'fa-star-half-alt']"></i>
      {{ isFavorite ? ' Remover dos Favoritos' : ' Adicionar aos Favoritos' }}
    </button>
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
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    pokemonImage(): string {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonId}.png`;
    },
  },
  emits: ['toggle-favorite'],
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.pokemonId);
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
  text-decoration: none;
  color: inherit;
}

.pokemon-card:hover {
  background-color: #e0e0e0;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.pokemon-name {
  text-transform: capitalize;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
