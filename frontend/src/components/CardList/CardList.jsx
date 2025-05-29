import Card from '../Card/Card.jsx';
import './CardList.css';

export default function CardList({ books }) {
  if (!books || books.length === 0) {
    return <p className="empty">No books available</p>;
  }

  return (
<div className="card-list">
      {books.map((book, index) => (
        <Card
          key={book.id || index}
          photo={book.photo}
          rating={book.rating}
          title={book.title}
          price={book.price}
          stock={book.stock}
        />
      ))}
    </div>
  );
}
