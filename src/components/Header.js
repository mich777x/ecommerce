// src/components/Header.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ShoppingCart, Heart, User, LogOut } from "lucide-react";

const Header = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { state } = useApp();
	const { cart, wishlist } = state;

	const navigate = useNavigate();
	const location = useLocation();
	const dropdownRef = useRef(null);

	const isAdminPath = location.pathname.startsWith("/admin");

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsProfileOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = () => {
		// Clear all admin-related data
		localStorage.removeItem("adminToken");
		localStorage.removeItem("userRole");
		localStorage.removeItem("adminSession");
		setIsProfileOpen(false);
		navigate("/admin/login");
	};
	// Admin Header
	if (isAdminPath) {
		return (
			<header className="bg-white shadow-md sticky top-0 z-50">
				<nav className="max-w-7xl mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<Link to="/admin" className="text-2xl font-bold text-gray-900">
							Admin Dashboard
						</Link>

						<div className="flex items-center space-x-4">
							<div className="relative" ref={dropdownRef}>
								<button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
									<User className="h-6 w-6" />
									<span className="text-sm">Admin</span>
								</button>

								{isProfileOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
										<Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
											<div className="flex items-center space-x-2">
												<User className="h-4 w-4" />
												<span>View Store</span>
											</div>
										</Link>
										<button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
											<div className="flex items-center space-x-2">
												<LogOut className="h-4 w-4" />
												<span>Log Out</span>
											</div>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</nav>
			</header>
		);
	}

	// Store Header
	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<Link to="/" className="text-2xl font-bold text-gray-900">
						Tech Store
					</Link>

					<div className="flex items-center space-x-6">
						<Link to="/wishlist" className="relative">
							<Heart className="h-6 w-6 text-gray-600 hover:text-red-500" />
							{wishlist?.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>}
						</Link>

						<Link to="/cart" className="relative">
							<ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-500" />
							{cart?.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</span>}
						</Link>

						<div className="relative" ref={dropdownRef}>
							<button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
								<User className="h-6 w-6" />
								<span className="text-sm">Account</span>
							</button>

							{isProfileOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
									<Link to="/admin/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
										<div className="flex items-center space-x-2">
											<User className="h-4 w-4" />
											<span>Admin Login</span>
										</div>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
