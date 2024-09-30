import { ref } from 'vue';
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export function usePokemon() {
    const pokemonList = ref<any[]>([]);
    const totalPokemon = ref(0);
    const limit = 20;
    const offset = ref(0);

    const fetchPokemon = async (offsetValue: number = 0) => {
        try {
            const response = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offsetValue}`);
            pokemonList.value = response.data.results;
            totalPokemon.value = response.data.count;
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
        }
    };

    const fetchAllPokemons = async () => {
        try {
            const response = await axios.get(`${BASE_URL}?limit=10000`);
            pokemonList.value = response.data.results;
            totalPokemon.value = response.data.count;
        } catch (error) {
            console.error('Erro ao buscar todos os Pokémon:', error);
        }
    };

    return {
        pokemonList,
        totalPokemon,
        fetchPokemon,
        fetchAllPokemons,
        limit,
        offset,
    };
}
