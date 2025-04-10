<template>
  <div>
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import { useCurrencyStore } from './store/useCurrency';
const currencyStore = useCurrencyStore();

onMounted(currencyStore.fetchRates);
</script>
