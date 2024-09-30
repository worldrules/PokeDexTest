import { ref } from 'vue';
import axios from 'axios';

export function usePokemon() {
    const pokemonList = ref([]);
    const isLoading = ref(false);
    const totalPokemon = ref(0);
    const limit = 20;
    const offset = ref(0);


    const getPokemonList = async (pageOffset = 0) => {

        isLoading.value = true;
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageOffset}`);
            pokemonList.value = response.data.results;
            totalPokemon.value = response.data.count;
        } catch (error) {
            console.log('Erro ao recuperar a lista de pokemons', error);
        } finally {
            isLoading.value = false;
        }
    }
    return {
        pokemonList,
        getPokemonList,
        totalPokemon,
        offset,
        limit,
        isLoading,
    };
}