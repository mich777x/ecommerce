import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { AppProvider } from "./context/AppContext";

const App = () => {
	return (
		<BrowserRouter>
			<AppProvider>
				<div className="min-h-screen bg-gray-50">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/wishlist" element={<Wishlist />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</div>
			</AppProvider>
		</BrowserRouter>
	);
};

export default App;
