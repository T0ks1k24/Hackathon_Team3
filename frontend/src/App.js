import React from 'react';
import BookList from './pages/BookList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold my-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 drop-shadow-lg animate-fadeIn">
        Книжкова бібліотека
      </h1>
      <BookList />
    </div>
  );
}


export default App;
