import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { AdminProvider } from "./context/AdminContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
	const hasAdminSession = localStorage.getItem("adminSession") === "true";
	const isAdmin = localStorage.getItem("userRole") === "admin";

	if (!hasAdminSession || !isAdmin) {
		return <Navigate to="/admin/login" replace />;
	}

	return children;
};

const App = () => {
	return (
		<AuthProvider>
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

						{/* Public/Customer Routes */}
						<Route
							path="/"
							element={
								<>
									<Header />
									<Home />
								</>
							}
						/>
						<Route
							path="/cart"
							element={
								<>
									<Header />
									<Cart />
								</>
							}
						/>
						<Route
							path="/wishlist"
							element={
								<>
									<Header />
									<Wishlist />
								</>
							}
						/>
						<Route
							path="/product/:id"
							element={
								<>
									<Header />
									<ProductDetails />
								</>
							}
						/>

						{/* Catch-all route */}
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</AppProvider>
			</AdminProvider>
		</AuthProvider>
	);
};

export default App;
