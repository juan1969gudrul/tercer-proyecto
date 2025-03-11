import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../apiService';

const ExchangeRate = ({ fromCurrency, toCurrency }) => {
  const [rate, setRate] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const rates = await fetchExchangeRates();
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const calculatedRate = toRate / fromRate;
        setRate(calculatedRate.toFixed(4));
        setLastUpdate(new Date().toLocaleTimeString());
        setError(null);
      } catch (err) {
        setError('Error al obtener el tipo de cambio');
        setRate(null);
      }
    };

    getExchangeRate();
    const interval = setInterval(getExchangeRate, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  if (error) {
    return (
      <div className="text-sm text-red-600 mt-2">
        {error}
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-600 mt-2">
      <p>1 {fromCurrency} = {rate} {toCurrency}</p>
      {lastUpdate && (
        <p className="text-xs">
          Última actualización: {lastUpdate}
        </p>
      )}
    </div>
  );
};

export default ExchangeRate;
