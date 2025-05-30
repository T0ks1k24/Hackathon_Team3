const API_URL = "http://3.77.211.196/api/books/book";

// 📚 GET ALL BOOKS
export const fetchBooks = async (page = 1) => {
  try {
    const params = new URLSearchParams({ page });
    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // ✅ FIX
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { results: [], count: 0 };
  }
};

// 📘 GET BOOK BY ID
export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/`);

    const text = await response.text();
    console.log(`RAW response fetchBookById (ID=${id}):`, text);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(text); // або response.json(), якщо не треба лог raw
    return data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    return null;
  }
};

// 🔎 SEARCH
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

    const data = await response.json(); // ✅ FIX
    return data;
  } catch (error) {
    console.error("Помилка при пошуку книг:", error);
    return { results: [], count: 0 };
  }
}

// 🎭 FILTER BY GENRE
export async function fetchBooksByGenre(genre, page = 1) {
  try {
    const params = new URLSearchParams({
      genre: genre, // не треба encodeURIComponent тут, URLSearchParams вже кодує
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
