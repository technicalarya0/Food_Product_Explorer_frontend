import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getCategories } from '../api/openFoodFacts';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ searchTerm, category, page }, { rejectWithValue }) => {
    try {
      const response = await getProducts(searchTerm, category, page);
      return { products: response.products, page, replace: page === 1 };
    } catch {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await getCategories();
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    status: 'idle',
    error: null,
    page: 1,
    hasMore: true,
    filters: {
      searchTerm: '',
      category: '',
      sortBy: 'none', // none, nameAsc, nameDesc, gradeAsc, gradeDesc
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.replace) {
          state.items = action.payload.products;
        } else {
          state.items = [...state.items, ...action.payload.products]; // Load more functionality [cite: 34]
        }
        state.hasMore = action.payload.products.length > 0;
        state.page = action.payload.page;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;