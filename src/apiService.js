import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/EUR';

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('No se pudieron obtener los tipos de cambio');
  }
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const rates = await fetchExchangeRates();
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    
    if (!fromRate || !toRate) {
      throw new Error('Moneda no válida');
    }

    const convertedAmount = (amount / fromRate) * toRate;
    return Number(convertedAmount.toFixed(2));
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};
