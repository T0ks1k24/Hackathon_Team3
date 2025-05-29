import './Card.css';

export default function Card({ photo, rating, title, price, stock }) {
  return (
    <div className="card">
      <img src={photo} alt={title} className="card-photo" />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-rating">⭐ {rating.toFixed(1)} / 5</p>
        <p className="card-price">${price.toFixed(2)}</p>
        <p className={`card-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {stock > 0 ? `In stock: ${stock}` : 'Out of stock'}
        </p>
      </div>
    </div>
  );
}
