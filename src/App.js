import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";
import { AdminProvider } from "./context/AdminContext";

// Layout component for customer routes
const CustomerLayout = () => (
	<div className="min-h-screen bg-gray-50">
		<Header />
		<Outlet />
	</div>
);

const App = () => {
	return (
		<AdminProvider>
			<AppProvider>
				<Routes>
					{/* Admin Routes */}
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route
						path="/admin/*"
						element={
							<ProtectedRoute>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>

					{/* Customer Routes */}
					<Route element={<CustomerLayout />}>
						<Route index element={<Home />} />
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/wishlist" element={<Wishlist />} />
					</Route>
				</Routes>
			</AppProvider>
		</AdminProvider>
	);
};

export default App;
