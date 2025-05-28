import React from 'react';
import { useGetBooksQuery } from '../features/books/booksApi';

const BookList = () => {
  const { data, error, isLoading } = useGetBooksQuery();

  if (isLoading) return <p className="text-center mt-10">Завантаження...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Помилка при завантаженні книг</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((book, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow">
          <img src={book.image_url} alt={book.title} className="w-full h-60 object-cover mb-2 rounded" />
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.price}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
