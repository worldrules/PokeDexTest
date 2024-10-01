<template>
    <div>
        <h1>Pokémon Favoritos</h1>
        <div class="pokemon-list" v-if="favoritePokemons.length">
            <PokemonCard v-for="(pokemon, index) in favoritePokemons" :key="index" :pokemon="pokemon"
                :pokemonId="getPokemonId(pokemon.url)" :isFavorite="true" />
        </div>
        <div v-else class="no-results">
            Nenhum Pokémon favorito encontrado.
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';

export default defineComponent({
    components: {
        PokemonCard,
    },
    setup() {
        const favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemons') || '[]');

        const getPokemonId = (url: string) => {
            const segments = url.split('/');
            return segments[segments.length - 2];
        };

        return {
            favoritePokemons,
            getPokemonId,
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

.no-results {
    margin-top: 20px;
    font-size: 18px;
    color: red;
}
</style>
