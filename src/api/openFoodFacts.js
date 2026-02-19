const BASE_URL = import.meta.env.VITE_OPEN_FOOD_FACTS_API_URL; // [cite: 59]

export const getProducts = async (searchTerm = '', category = '', page = 1) => {
  let url = `${BASE_URL}/cgi/search.pl?search_terms=${searchTerm}&json=true&page=${page}`; // [cite: 62, 63]
  
  if (category) {
    url = `${BASE_URL}/category/${category}.json?page=${page}`; // [cite: 61]
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getProductByBarcode = async (barcode) => {
  const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`); // [cite: 64, 65, 66]
  const data = await response.json();
  return data;
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories.json`);
  const data = await response.json();
  return data.tags.filter(tag => tag.products > 1000).slice(0, 50); // Fetching meaningful categories [cite: 43]
};