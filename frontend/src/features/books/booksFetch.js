const API_URL = "http://localhost:8000/api/books/book";

export const fetchBooks = async (page = 1) => {
  try {
    const params = new URLSearchParams({ page });
    const response = await fetch(`${API_URL}?${params.toString()}`);
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
    const response = await fetch(`${API_URL}/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    return null;
  }
};

export async function fetchBooksBySearch(searchTerm, page = 1) {
  try {
    const params = new URLSearchParams({
      search: searchTerm,
      page,
    });
    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка при пошуку книг:", error);
    return { results: [], count: 0 };
  }
}

export async function fetchBooksByGenre(genre, page = 1) {
  try {
    const params = new URLSearchParams({
      genre: encodeURIComponent(genre),
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