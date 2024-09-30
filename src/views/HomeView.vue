<template>
  <div>
    <h1>Pokédex</h1>
    <PokemonList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokemonList from '@/components/PokemonList.vue';

export default defineComponent({
  components: {
    PokemonList,
  },
});
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
