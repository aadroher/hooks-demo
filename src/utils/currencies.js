const currencies = [
  {
    name: 'Euro',
    code: 'EUR',
    flag: '🇪🇺',
    symbol: '€',
  },
  {
    name: 'Pound Sterling',
    code: 'GBP',
    flag: '🇬🇧',
    symbol: '£',
  },
  {
    name: 'US Dollar',
    code: 'USD',
    flag: '🇺🇸',
    symbol: '$',
  },
];

const getCurrencies = () => currencies;

const getCurrencyAttribute = (selectedCode, attributeName) => {
  const currency = currencies.find(({ code }) => selectedCode === code) || {};
  return currency[attributeName] || '';
};

export { getCurrencies, getCurrencyAttribute };
