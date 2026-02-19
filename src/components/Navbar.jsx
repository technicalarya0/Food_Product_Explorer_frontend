import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleCart } from '../store/cartSlice';
import Cart from './Cart';

export default function Navbar() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  const handleBarcodeSearch = (e) => {
    e.preventDefault();
    if (barcodeInput.trim()) {
      navigate(`/product/${barcodeInput}`);
      setBarcodeInput('');
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 cursor-pointer hover:text-blue-700" onClick={() => navigate('/')}>
          🍎 FoodExplorer
        </h1>
        
        <form onSubmit={handleBarcodeSearch} className="flex gap-2 w-full md:w-auto md:flex-1 md:max-w-md">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search by Barcode..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
            Search
          </button>
        </form>

        <button 
          onClick={() => dispatch(toggleCart())} 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg relative font-medium transition-colors"
        >
          <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
          </svg>
          Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </div>
      <Cart />
    </nav>
  );
}