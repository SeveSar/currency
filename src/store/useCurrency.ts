import { fetchCurrenciesApi } from '@/api/currency';
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref('USD');
  const apiRates = ref<Record<string, number> | null>(null);
  const isLoading = ref(true);

  const setBaseCurrency = (currency: string) => {
    baseCurrency.value = currency;
  }

  const fetchRates = async () => {
    try {
      apiRates.value = await fetchCurrenciesApi();
      console.log(apiRates.value)
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    baseCurrency,
    apiRates,
    isLoading,
    fetchRates,
    setBaseCurrency
  }
})
