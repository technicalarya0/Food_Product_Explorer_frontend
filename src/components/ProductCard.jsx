import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useToast } from '../hooks/useToast';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const getGradeColor = (grade) => {
    const colors = {
      'a': 'bg-green-500',
      'b': 'bg-lime-500',
      'c': 'bg-yellow-500',
      'd': 'bg-orange-500',
      'e': 'bg-red-500'
    };
    return colors[grade?.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md p-6 flex flex-col">
      <div className="relative mb-4">
        <img 
          src={product.image_url || 'https://via.placeholder.com/200x200?text=No+Image'} 
          alt={product.product_name} 
          className="h-48 w-full object-contain rounded-lg cursor-pointer hover:opacity-75"
          onClick={() => navigate(`/product/${product.code}`)}
        />
        <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getGradeColor(product.nutrition_grades)}`}>
          {product.nutrition_grades?.toUpperCase() || '?'}
        </div>
      </div>
      
      <h2 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2" 
          title={product.product_name}
          onClick={() => navigate(`/product/${product.code}`)}>
        {product.product_name || 'Unknown Product'} 
      </h2>
      
      <p className="text-sm text-gray-500 mb-3 line-clamp-1">{product.categories?.split(',')[0] || 'Uncategorized'}</p>
      
      <div className="mb-4 text-sm text-gray-700 flex-grow">
        <strong className="text-gray-800">Ingredients:</strong> 
        <span className="line-clamp-2 ml-1">{product.ingredients_text || 'Not available'}</span> 
      </div>
      
      <button 
        onClick={() => {
          dispatch(addToCart({ 
            id: product.code, 
            name: product.product_name, 
            image: product.image_url 
          }));
          addToast(`${product.product_name} added to cart!`, 'success');
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
      >
        <svg className="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add to Cart
      </button>
    </div>
  );
}