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
      <div v-if="evolutionChain.length">
        <div v-for="evolution in evolutionChain" :key="evolution.id" class="evolution-stage">
          <img :src="getPokemonImageUrl(evolution.id)" alt="Imagem de evolução" />
          <span>{{ capitalizeFirstLetter(evolution.name) }}</span>
        </div>
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
import { defineComponent, ref, onMounted } from 'vue';
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
    const evolutionChain = ref<{ id: number; name: string }[]>([]);
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
        evolutionChain.value = await fetchEvolutionChain(id);
      } catch (error) {
        console.error("Erro ao carregar os detalhes do Pokémon:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
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

.evolution-stage {
  display: inline-block;
  margin: 10px;
  text-align: center;
}

.evolution-stage img {
  width: 100px;
  height: 100px;
}
</style>
