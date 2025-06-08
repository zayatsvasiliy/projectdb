<script setup>
import Time from './components/main.vue'
</script>

<template>
  <Time :showSavedTimes="true" />
</template>

<style>
@import './assets/base.css';

#app {
  margin: 100px auto;
}

.green {
  color: hsla(160, 100%, 37%, 1);
}
</style>
