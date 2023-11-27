import axios from 'axios';
const apiKey = '39863085-06c0b9c863431b4674cecc2b0';

export const queryImg = async (query, currentPage) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: { key: apiKey, q: query, page: currentPage, per_page: 12 },
    });

    return response.data;
  } catch (error) {
    console.error('Помилка під час запиту до Pixabay API:', error);
  }
};
