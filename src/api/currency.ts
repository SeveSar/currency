export const fetchCurrenciesApi = async () => {
  const response = await fetch('https://status.neuralgeneration.com/api/currency')
  return response.json()
}