<template>
  <header class="header">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/convert">Конвертация</router-link>
    </nav>
    <CurrencyDropdown
      v-model="currencyStore.baseCurrency"
      @currencyChange="currencyStore.setBaseCurrency"
    />
  </header>
</template>

<script setup lang="ts">
import CurrencyDropdown from './CurrencyDropdown.vue';
import { useCurrencyStore } from '../store/useCurrency.ts';

const currencyStore = useCurrencyStore();
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--header-bg-color);
}

.header nav a {
  margin-right: 1.5rem;
  font-size: 1rem;
  color: var(--header-text-color);
}
.header .router-link-active {
  color: var(--primary-color);
}

.header nav a:last-child {
  margin-right: 0;
}
</style>
