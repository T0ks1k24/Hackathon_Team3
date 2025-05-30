
import { useNavigate } from 'react-router-dom';
import './Card.css';

export default function Card({ id, photo, rating, title, price, stock }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${id}`);
  };

  const numericRating = typeof rating === 'number' ? rating : parseFloat(rating) || 0;
  const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={photo} alt={title} className="card-photo" />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-rating">⭐ {numericRating.toFixed(1)} / 5</p>
        <p className="card-price">${numericPrice.toFixed(2)}</p>
        <p className={`card-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {stock > 0 ? `In stock: ${stock}` : 'Out of stock'}
        </p>
      </div>
    </div>
  );
}
