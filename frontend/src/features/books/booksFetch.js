const API_URL = "http://3.77.211.196/api/books/";

// 📚 GET ALL BOOKS
export const fetchBooks = async (page = 1) => {
  try {
    const params = new URLSearchParams({ page });
    const response = await fetch(`${API_URL}/book/?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { results: [], count: 0 };
  }
};


export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/book/${id}/`);

    const text = await response.text();
    console.log(`RAW response fetchBookById (ID=${id}):`, text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(text); 
    return data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    return null;
  }
};


export async function fetchBooksBySearch(query, page = 1) {
  const response = await fetch(`http://3.77.211.196/api/books/book/?search=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) throw new Error('Error fetching books');
  return response.json();
}

export async function fetchBooksByGenre(genre, page = 1) {
  try {
    const params = new URLSearchParams({
      genre: genre, 
      page,
    });
    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка при отриманні книг за жанром:", error);
    return { results: [], count: 0 };
  }
}
