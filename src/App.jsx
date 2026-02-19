import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Toast from './components/Toast'
import { ToastProvider } from './providers/ToastProvider'

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:barcode" element={<ProductDetail />} />
          </Routes>
        </main>
        <footer className="bg-white border-t mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; 2026 Food Product Explorer. Powered by Open Food Facts.</p>
          </div>
        </footer>
        <Toast />
      </div>
    </ToastProvider>
  )
}

export default App
