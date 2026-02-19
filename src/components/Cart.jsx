import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeFromCart } from '../store/cartSlice';
import { useToast } from '../hooks/useToast';

export default function Cart() {
  const { items, isOpen } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { addToast } = useToast();

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-96 bg-white shadow-2xl border border-gray-200 rounded-xl p-6 z-50 max-h-96 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
          </svg>
          Your Cart
        </h3>
        <button 
          onClick={() => dispatch(toggleCart())} 
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
          </svg>
          <p className="mt-4 text-gray-500 font-medium">Your cart is empty</p>
          <p className="text-sm text-gray-400">Add some products to get started!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  addToast(`${item.name} removed from cart!`, 'warning');
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors flex-shrink-0"
                title="Remove item"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      {items.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
            <span>Total Items:</span>
            <span>{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
        </div>
      )}
    </div>
  );
}