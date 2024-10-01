<template>
    <div>
        <button @click="goBack" class="back-button">Voltar</button>
        <h1>Pokémon Favoritos</h1>
        <div class="pokemon-list" v-if="favoritePokemons.length">
            <PokemonCard v-for="(pokemon, index) in favoritePokemons" :key="index" :pokemon="pokemon"
                :pokemonId="getPokemonId(pokemon.url)" :pokemonImage="getPokemonImage(pokemon.url)" :isFavorite="true"
                @toggle-favorite="toggleFavorite" />
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
        const favoritePokemons = ref(
            JSON.parse(localStorage.getItem('favoritePokemons') || '[]')
        );

        const getPokemonId = (url: string) => {
            if (!url) return '';
            const segments = url.split('/');
            return segments[segments.length - 2];
        };

        const getPokemonImage = (url: string) => {
            const id = getPokemonId(url);
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        };

        const toggleFavorite = (id: string) => {
            const currentFavorites = favoritePokemons.value;
            const index = currentFavorites.findIndex(
                (pokemon: any) => getPokemonId(pokemon.url) === id
            );
            if (index !== -1) {
                currentFavorites.splice(index, 1);
            } else {
            }
            localStorage.setItem('favoritePokemons', JSON.stringify(currentFavorites));
            favoritePokemons.value = currentFavorites;
        };

        const goBack = () => {
            window.history.back();
        };

        return {
            favoritePokemons,
            getPokemonId,
            getPokemonImage,
            toggleFavorite,
            goBack, // Adicionando goBack ao retorno
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

.back-button {
    background-color: #f08030;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    margin-bottom: 20px;
}

.back-button:hover {
    background-color: #d86f27;
    transform: scale(1.05);
}
</style>
