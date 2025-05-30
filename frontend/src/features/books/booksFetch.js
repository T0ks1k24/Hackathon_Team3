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