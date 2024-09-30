<template>
  <div class="filter">
    <input v-model="searchQuery" @input="emitSearch" :placeholder="$t('search_placeholder')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const searchQuery = ref('');

    const emitSearch = () => {
      emit('update:search', searchQuery.value);
    };

    return {
      searchQuery,
      emitSearch,
    };
  },
});
</script>

<style scoped>
.filter {
  margin-bottom: 20px;
  text-align: center;
}
input {
  padding: 10px;
  font-size: 16px;
}
</style>
