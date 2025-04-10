<template>
  <div class="container">
    <h1>Конвертация валют</h1>
    <template v-if="!currencyStore.isLoading && currencyStore.apiRates">
      <div class="form-row">
        <CurrencyDropdown v-model="fromCurrency" />
        <input type="number" v-model="fromAmount" @input="convertTo" />
      </div>
      <div class="form-row">
        <CurrencyDropdown v-model="toCurrency" />
        <input type="number" v-model="toAmount" @input="convertFrom" />
      </div>
    </template>
    <AppSpinner v-if="currencyStore.isLoading"></AppSpinner>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CurrencyDropdown from '../components/CurrencyDropdown.vue';
import { useCurrencyStore } from '../store/useCurrency';
import AppSpinner from '../components/AppSpinner.vue';

const currencyStore = useCurrencyStore();

const fromCurrency = ref('USD');
const toCurrency = ref('RUB');
const fromAmount = ref(1);
const toAmount = ref(0);

const getRate = (from: string, to: string) => {
  if (!currencyStore.apiRates) return 0;
  const pair = `${from.toLowerCase()}-${to.toLowerCase()}`;
  return currencyStore.apiRates[pair] || 1;
};

const convertTo = () => {
  if (!currencyStore.apiRates) return;
  const rate = getRate(fromCurrency.value, toCurrency.value);
  toAmount.value = parseFloat((fromAmount.value * rate).toFixed(2));
};

const convertFrom = () => {
  const rate = getRate(toCurrency.value, fromCurrency.value);
  fromAmount.value = parseFloat((toAmount.value * rate).toFixed(2));
};

watch([fromCurrency, toCurrency, () => currencyStore.apiRates], () => {
  convertTo();
});
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 25px;
}

.form-row select,
.form-row input {
  margin-right: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--input-border-color);
  border-radius: 4px;
  width: calc(50% - 1rem);
  height: 45px;
}

.form-row input:focus,
.form-row select:focus {
  border-color: var(--input-focus-border-color);
  outline: none;
}
</style>
