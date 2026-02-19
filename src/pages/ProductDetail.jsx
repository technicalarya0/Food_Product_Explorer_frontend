import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductByBarcode } from '../api/openFoodFacts';
import Loader from '../components/Loader';

export default function ProductDetail() {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByBarcode(barcode); // Fetch product details via barcode [cite: 68]
        setProduct(data.product);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [barcode]);

  if (loading) return <Loader />;
  if (!product) return (
    <div className="text-center py-16">
      <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.625-2.625M12 7v8" />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Product not found</h3>
      <p className="mt-2 text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <button onClick={() => navigate(-1)} className="mb-8 text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </button>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img 
            src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'} 
            alt={product.product_name} 
            className="w-full h-auto object-contain rounded-xl border-2 border-gray-200 p-6 bg-gray-50"
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">{product.product_name}</h1>
          <p className="text-xl text-gray-600 mb-6 font-medium">{product.brands}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ingredients
              </h3>
              <p className="text-gray-700 leading-relaxed">{product.ingredients_text || 'Ingredients not listed.'}</p> 
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Labels
              </h3>
              <p className="text-gray-700 leading-relaxed">{product.labels || 'No labels found.'}</p> 
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 mb-8">
            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Nutritional Information (per 100g)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{product.nutriments?.['energy-kcal_100g'] || 0}</div>
                <div className="text-sm text-gray-600">kcal</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{product.nutriments?.fat_100g || 0}g</div>
                <div className="text-sm text-gray-600">Fat</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{product.nutriments?.carbohydrates_100g || 0}g</div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{product.nutriments?.proteins_100g || 0}g</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl text-center shadow-lg flex-1">
              <div className="text-sm text-green-700 uppercase font-semibold mb-2">Nutrition Grade</div>
              <div className="text-5xl font-bold text-green-800">{product.nutrition_grades?.toUpperCase() || '?'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl text-center shadow-lg flex-1">
              <div className="text-sm text-blue-700 uppercase font-semibold mb-2">Eco Score</div>
              <div className="text-5xl font-bold text-blue-800">{product.ecoscore_grade?.toUpperCase() || '?'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}