<template>
    <div>
        <h1>Pokémon Favoritos</h1>
        <div class="pokemon-list" v-if="favoritePokemons.length">
            <PokemonCard v-for="(pokemon, index) in favoritePokemons" :key="index" :pokemon="pokemon"
                :pokemonId="getPokemonId(pokemon.url)" :isFavorite="true" @toggle-favorite="toggleFavorite" />
        </div>
        <div v-else class="no-results">
            Nenhum Pokémon favorito encontrado.
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';

export default defineComponent({
    components: {
        PokemonCard,
    },
    setup() {
        const favoritePokemons = ref(JSON.parse(localStorage.getItem('favoritePokemons') || '[]'));

        const getPokemonId = (url: string) => {
            if (!url) return ''; // Verifica se a URL está definida
            const segments = url.split('/');
            return segments[segments.length - 2];
        };

        const toggleFavorite = (id: string) => {
            const currentFavorites = favoritePokemons.value;
            const index = currentFavorites.findIndex((pokemon: any) => getPokemonId(pokemon.url) === id);
            if (index !== -1) {
                currentFavorites.splice(index, 1);
            } else {
            }
            localStorage.setItem('favoritePokemons', JSON.stringify(currentFavorites));
            favoritePokemons.value = currentFavorites;
        };

        return {
            favoritePokemons,
            getPokemonId,
            toggleFavorite,
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
