<template>
  <div>
    <h1>Pokédex</h1>
    <PokemonList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import PokemonList from '@/components/PokemonList.vue';

export default defineComponent({
  components: {
    PokemonList,
  },
  setup() {
    const router = useRouter();



    return {
    };
  },
});
</script>

<style scoped>
h1 {
  text-align: center;
}

.favorites-button {
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.favorites-button:hover {
  background-color: #e6b800;
}
</style>
