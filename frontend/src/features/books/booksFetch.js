const API_URL = "http://localhost:8000/api/books/book";

export const fetchBooks = async (page = 1) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
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
      throw new Error("Book not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    return null;
  }
};

export async function fetchBooksBySearch(searchTerm) {
  try {
    const response = await fetch(`${API_URL}?search=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error("Помилка при завантаженні книг");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка:", error);
    return [];
  }
}

export async function fetchBooksByGenre(genre, page = 1) {
  const res = await fetch(`${API_URL}?genre=${genre}&page=${page}`);
  return await res.json();
}
