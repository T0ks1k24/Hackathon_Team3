const API_URL = "http://3.77.211.196/api/books/book";

export const fetchBooks = async (page = 1) => {
  try {
    const response = await fetch(`${API_URL}`);

    const text = await response.text();
    console.log("RAW response fetchBooks:", text);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { results: [], count: 0 };
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/`);

    const text = await response.text();
    console.log(`RAW response fetchBookById (ID=${id}):`, text);

    if (!response.ok) {
      throw new Error("Book not found");
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    return null;
  }
};

export async function fetchBooksBySearch(searchTerm) {
  try {
    const response = await fetch(`${API_URL}?search=${encodeURIComponent(searchTerm)}`);

    const text = await response.text();
    console.log("RAW response fetchBooksBySearch:", text);

    if (!response.ok) {
      throw new Error("Помилка при завантаженні книг");
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Помилка:", error);
    return [];
  }
}

export async function fetchBooksByGenre(genre, page = 1) {
  try {
    const response = await fetch(`${API_URL}?genre=${genre}&page=${page}`);

    const text = await response.text();
    console.log("RAW response fetchBooksByGenre:", text);

    if (!response.ok) {
      throw new Error("Помилка при завантаженні книг за жанром");
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Помилка:", error);
    return [];
  }
}
