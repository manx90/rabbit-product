import { lazy, Suspense } from "react";
import {
	BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
const CategoryPage = lazy(() =>
	import("./pages/CategoryPage.jsx"),
);
const ProductPage = lazy(() =>
	import("./pages/ProductPage.jsx"),
);
const FavoritePage = lazy(() =>
	import("./pages/FavoritePage.jsx"),
);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 60 * 1000,
		},
	},
});

function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<ScrollToTop />
					<Suspense fallback={<Loading />}>
						<Layout>
							<Routes>
								<Route
									path="/"
									element={<Home />}
								/>
								<Route
									path="/Favorites"
									element={<FavoritePage />}
								/>
								<Route
									path="/category/:categoryId"
									element={<CategoryPage />}
								/>
								<Route
									path="/category/:categoryId/:subcategoryId"
									element={<CategoryPage />}
								/>
								<Route
									path="/product/:id"
									element={<ProductPage />}
								/>
							</Routes>
						</Layout>
					</Suspense>
				</BrowserRouter>
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
