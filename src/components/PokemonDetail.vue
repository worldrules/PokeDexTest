<template>
  <div v-if="pokemon" class="pokemon-detail">
    <h1>{{ capitalizeFirstLetter(pokemon?.name) }} ({{ pokemon?.id }})</h1>

    <img :src="getPokemonImageUrl(pokemon.id)" alt="Imagem do Pokémon" class="pokemon-image" />

    <div class="pokemon-types">
      <span v-for="type in pokemon?.types" :key="type.type.name" :class="['type', type.type.name]">
        {{ capitalizeFirstLetter(type.type.name) }}
      </span>
    </div>

    <div class="pokemon-stats">
      <h2>Stats</h2>
      <ul>
        <li v-for="stat in pokemon?.stats" :key="stat.stat.name">
          <strong>{{ capitalizeFirstLetter(stat.stat.name) }}:</strong> {{ stat.base_stat }}
        </li>
      </ul>
    </div>

    <div class="pokemon-evolutions">
      <h2>Evolutions</h2>
      <div v-if="evolutionChain.length > 0" class="evolution-cards">
        <router-link 
          v-for="evolution in evolutionChain" 
          :key="evolution.id" 
          :to="{ name: 'PokemonDetail', params: { id: evolution.id } }" 
          class="evolution-card">
          <img :src="getPokemonImageUrl(evolution.id)" alt="Imagem de evolução" />
          <span>{{ capitalizeFirstLetter(evolution.name) }}</span>
        </router-link>
      </div>
      <div v-else>
        <p>Este Pokémon não evolui.</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Carregando detalhes do Pokémon...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemon } from '@/composables/usePokemon';

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

interface Evolution {
  id: number;
  name: string;
}

interface Pokemon {
  id: number;
  name: string;
  types: Type[];
  stats: Stat[];
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const pokemon = ref<Pokemon | null>(null);
    const evolutionChain = ref<Evolution[]>([]);
    const loading = ref(true);

    const { fetchPokemonDetails, fetchEvolutionChain } = usePokemon();

    const capitalizeFirstLetter = (name: string | undefined) => {
      if (!name) return '';
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const getPokemonImageUrl = (id: number) => {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    const loadPokemonDetails = async () => {
      try {
        const id = Number(route.params.id);
        pokemon.value = await fetchPokemonDetails(id);
        if (pokemon.value) {
          evolutionChain.value = await fetchEvolutionChain(id);
        }
      } catch (error) {
        console.error("Erro ao carregar os detalhes do Pokémon:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadPokemonDetails();
    });

    
    watch(() => route.params.id, (newId) => {
      loading.value = true;
      loadPokemonDetails();
    });

    return {
      pokemon,
      evolutionChain,
      capitalizeFirstLetter,
      getPokemonImageUrl,
      loading,
    };
  },
});
</script>

<style scoped>
.pokemon-detail {
  text-align: center;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  margin: 20px 0;
}

.pokemon-types {
  margin: 10px 0;
}

.type {
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  margin-right: 5px;
  font-weight: bold;
  display: inline-block;
}

.type.fire { background-color: #f08030; }
.type.water { background-color: #6890f0; }
.type.grass { background-color: #78c850; }
.type.electric { background-color: #f8d030; }

.pokemon-stats {
  margin-top: 20px;
}

.pokemon-evolutions {
  margin-top: 20px;
}

.evolution-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.evolution-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  transition: box-shadow 0.3s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.evolution-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.evolution-card img {
  width: 80px;
  height: 80px;
}
</style>
