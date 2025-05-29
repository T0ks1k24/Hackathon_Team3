import CardList from '../../components/CardList/CardList.jsx';
import './BooksPage.css';

export default function BooksPage() {
  const books = [
    {
      id: 1,
      photo: 'https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/c/o/cover_134567_25.jpg',
      title: 'The Great Gatsby',
      rating: 4.5,
      price: 19.99,
      stock: 12,
    },
    {
      id: 2,
      photo: 'https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_1710.jpg',
      title: '1984',
      rating: 4.8,
      price: 14.99,
      stock: 0,
    },
    {
      id: 3,
      photo: 'https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/8/0/80e1685978d971ca0cb2d34339bd437e.jpg',
      title: 'To Kill a Mockingbird',
      rating: 4.9,
      price: 21.5,
      stock: 5,
    },
    {
      id: 4,
      photo: 'https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/8/0/80e1685978d971ca0cb2d34339bd437e.jpg',
      title: 'To Kill a Mockingbird',
      rating: 4.9,
      price: 21.5,
      stock: 5,
    },
    {
      id: 5,
      photo: 'https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/8/0/80e1685978d971ca0cb2d34339bd437e.jpg',
      title: 'To Kill a Mockingbird',
      rating: 4.9,
      price: 21.5,
      stock: 5,
    },
    {
      id: 6,
      photo: 'https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/8/0/80e1685978d971ca0cb2d34339bd437e.jpg',
      title: 'To Kill a Mockingbird',
      rating: 4.9,
      price: 21.5,
      stock: 5,
    },
    
  ];

  return (
    <div className="books-page">
      <h1 className="books-title">Books List</h1>
      <CardList books={books} />
    </div>
  );
}
