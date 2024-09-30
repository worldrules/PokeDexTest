import { ref } from 'vue';
import axios from 'axios';

export function usePokemon() {
    const pokemonList = ref([]);
    const isLoading = ref(false);

    const getPokemonList = async () => {

        isLoading.value = true;
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
            pokemonList.value = response.data.results;
        } catch (error) {
            console.log('Erro ao recuperar a lista de pokemons', error);
        } finally {
            isLoading.value = false;
        }
    }
    return {
        pokemonList,
        getPokemonList,
        isLoading,
    };
}