<template>
  <div id="app">
    <header>
      <h1>Pokédex</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
}

header {
  background-color: #f8d030;
  padding: 20px;
  border-radius: 10px;
}

h1 {
  margin: 0;
  color: #fff;
  font-size: 2.5rem;
}
</style>
