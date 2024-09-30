<template>
  <div class="pokemon-card">
    <h3>{{ pokemon.name }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    pokemon: {
      type: Object as PropType<{ name: string, url: string }>,
      required: true,
    },
  },
});
</script>

<style scoped>
.pokemon-card {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
}
</style>
