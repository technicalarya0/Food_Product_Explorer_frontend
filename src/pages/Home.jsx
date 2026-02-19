import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, setFilters, setSortBy } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function Home() {
  const dispatch = useDispatch();
  const { items, categories, status, page, hasMore, filters } = useSelector(state => state.products);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories for the filter [cite: 43]
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, page: 1 }));
  }, [dispatch, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ searchTerm: searchInput })); // Search by name functionality [cite: 36, 37]
  };

  const handleLoadMore = () => {
    if (status !== 'loading' && hasMore) {
      dispatch(fetchProducts({ ...filters, page: page + 1 })); // Load more functionality [cite: 34]
    }
  };

  // Client-side sorting logic [cite: 44, 45, 46, 47]
  const sortedItems = useMemo(() => {
    let sorted = [...items];
    if (filters.sortBy === 'nameAsc') {
      sorted.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
    } else if (filters.sortBy === 'nameDesc') {
      sorted.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''));
    } else if (filters.sortBy === 'gradeAsc') {
      sorted.sort((a, b) => (a.nutrition_grades || 'z').localeCompare(b.nutrition_grades || 'z'));
    } else if (filters.sortBy === 'gradeDesc') {
      sorted.sort((a, b) => (b.nutrition_grades || 'a').localeCompare(a.nutrition_grades || 'a'));
    }
    return sorted;
  }, [items, filters.sortBy]);

  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search & Filter Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search by Name */}
          <form onSubmit={handleSearch} className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter product name..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button type="submit" className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Search
            </button>
          </form>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
              value={filters.category}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              value={filters.sortBy}
            >
              <option value="none">No Sorting</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="gradeAsc">Nutrition Grade (A-Z)</option>
              <option value="gradeDesc">Nutrition Grade (Z-A)</option> 
            </select>
          </div>
        </div>
      </div>

      {status === 'loading' && items.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((product, index) => (
              <ProductCard key={`${product.code}-${index}`} product={product} />
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center mt-8">
              <button 
                onClick={handleLoadMore} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Loading...
                  </div>
                ) : (
                  'Load More Products'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}