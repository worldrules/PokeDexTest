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
    const fetchPokemonDetails = async (id: number) => {
        try {
            const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar detalhes do Pokémon:', error);
            return null;
        }
    };
    const fetchEvolutionChain = async (id: number) => {
        try {
            const speciesResponse = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
            const evolutionUrl = speciesResponse.data.evolution_chain.url;
            const evolutionResponse = await axios.get(evolutionUrl);

            const evolutionChain = [];
            let evolutionData = evolutionResponse.data.chain;

            do {
                const idFromUrl = evolutionData.species.url.split('/').slice(-2, -1)[0];
                evolutionChain.push({
                    id: idFromUrl,
                    name: evolutionData.species.name,
                });
                evolutionData = evolutionData.evolves_to[0];
            } while (evolutionData);

            return evolutionChain;
        } catch (error) {
            console.error('Erro ao buscar cadeia de evolução:', error);
            return [];
        }
    };

    return {
        pokemonList,
        totalPokemon,
        fetchPokemon,
        fetchAllPokemons,
        fetchEvolutionChain,
        fetchPokemonDetails,
        limit,
        offset,
    };
}
