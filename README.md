# Food Product Explorer

A responsive web application that allows users to search, filter, and view detailed information about food products. 

## Methodology

This project was built using a modern React ecosystem to ensure a clean, modular, and performant application:

* **Core Framework:** React.js initialized with Vite for fast cold starts and instant HMR.
* **Routing:** `react-router-dom` was used to handle client-side routing between the Homepage and Product Detail pages.
* **State Management:** Redux Toolkit was implemented to manage global states, specifically for handling product data, filtering/sorting parameters, and the bonus Cart functionality.
* **Styling:** TailwindCSS was chosen for styling to ensure a fully responsive design across mobile and desktop screens using utility-first classes.
* **API Integration:** The OpenFoodFacts API is integrated using native `fetch`. Data fetching logic is abstracted into a dedicated API layer and handled via Redux `createAsyncThunk` for asynchronous state management (loading, success, error).
* **Features Implemented:**
    * Dynamic rendering of food products with key information (name, image, category, ingredients, nutrition grade).
    * Search by product name and search by barcode functionality.
    * Category filtering via a dynamic dropdown fetched from the API.
    * Client-side sorting by product name (A-Z, Z-A) and nutrition grade (Ascending/Descending).
    * Pagination achieved through a "Load More" implementation.
    * Detailed product view displaying full ingredients, labels, and nutritional values.
    * **Bonus:** A fully functional cart system managed via Redux.

## Time Taken
 * **Project setup & deps**: 10–20 min — verify Tailwind, install/verify packages, adjust config.
 * **Integrating OpenFoodFacts API**: 60-90 min - implementing and verifying the API requests
 * **Asynchronous state**: 40-60 min - implementing and debugging the requests
 * **Layout & global styles**: 45–60 min — change containers, spacing, colors, header/footer.* * **Cards & details pages**: 40–60 min — implement card fixes, truncation, responsive tweaks.* **Toasts & notifications**: 20–35 min — add context/provider, UI, hook, wire add/remove actions.
 * **QA, polish & build**: 15–30 min — test responsive, fix edge cases, run build/lint.



## How to Run Locally

1. Clone the repository.
2. Navigate to the project directory: `cd food-product-explorer`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory and add the following:
   `VITE_OPEN_FOOD_FACTS_API_URL=https://world.openfoodfacts.org`
5. Start the development server: `npm run dev`
6. Open your browser and visit the local host URL provided in your terminal (usually `http://localhost:5173`).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
