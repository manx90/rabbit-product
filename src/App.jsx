import { lazy, Suspense } from "react";
import {
	BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";
import Loading from "./components/Loading";
import { CartProvider } from "@/contexts/CartContext";

const Home = lazy(() => import("./pages/Home.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const FavoritePage = lazy(() => import("./pages/FavoritePage.jsx"));
const DeskPage = lazy(() => import("./pages/DeskPage.jsx"));
const InfoPaymentPage = lazy(() => import("./pages/InfoPaymentPage.jsx"));

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/InfoPayment" element={<InfoPaymentPage />} />
						<Route path="/Favorites" element={<FavoritePage />} />
						<Route path="/category/:categoryId" element={<CategoryPage />} />
						<Route path="/category/:categoryId/subcategory/:subcategoryId" element={<CategoryPage />} />
						<Route path="/category/:categoryId/subcategory/:subcategoryId/product/:productId" element={<ProductPage />} />
						<Route path="/Desk" element={<DeskPage />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
