<template>
  <div class="home container">
    <h1>Курсы валют</h1>

    <ul v-if="currencyStore.apiRates && !currencyStore.isLoading">
      <li v-for="currency in displayRates" :key="currency.name">
        1 {{ currency.name }} = <strong>{{ currency.rate }}</strong>
        {{ currencyStore.baseCurrency }}
      </li>
    </ul>
    <AppSpinner v-if="currencyStore.isLoading" class="spinner" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCurrencyStore } from '../store/useCurrency';
import AppSpinner from '../components/AppSpinner.vue';

const currencyStore = useCurrencyStore();
const displayRates = computed(() => {
  if (!currencyStore.apiRates) return null;
  const base = currencyStore.baseCurrency.toLowerCase();
  return Object.entries(currencyStore.apiRates)
    .filter(([key]) => key.startsWith(base))
    .map(([key, rate]) => ({
      name: key.split('-')[1].toUpperCase(),
      rate: rate.toFixed(2),
    }));
});
</script>
