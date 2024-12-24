import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ShoppingCart, Heart, User, LogOut, Settings, ChevronDown } from "lucide-react";

const Header = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const { state } = useApp();
	const { cart, wishlist } = state;
	const navigate = useNavigate();
	const dropdownRef = useRef(null);

	// Check if user is admin
	const isAdmin = localStorage.getItem("userRole") === "admin";

	// Handle click outside of dropdown
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
		localStorage.removeItem("adminToken");
		localStorage.removeItem("userRole");
		setIsProfileOpen(false);
		navigate("/");
	};

	const handleSwitchToAdmin = () => {
		localStorage.setItem("adminToken", "mock-jwt-token");
		localStorage.setItem("userRole", "admin");
		setIsProfileOpen(false);
		navigate("/admin");
	};

	const handleSwitchToUser = () => {
		localStorage.setItem("userRole", "user");
		setIsProfileOpen(false);
		navigate("/");
	};

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<Link to="/" className="text-2xl font-bold text-gray-900">
						Tech
					</Link>

					<div className="flex items-center space-x-6">
						<Link to="/wishlist" className="relative">
							<Heart className="h-6 w-6 text-gray-600 hover:text-red-500" />
							{wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>}
						</Link>

						<Link to="/cart" className="relative">
							<ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-500" />
							{cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</span>}
						</Link>

						{/* Profile Dropdown */}
						<div className="relative" ref={dropdownRef}>
							<button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
								<User className="h-6 w-6" />
								<ChevronDown className="h-4 w-4" />
							</button>

							{isProfileOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
									<div className="px-4 py-2 border-b border-gray-200">
										<p className="text-sm font-medium text-gray-900">{isAdmin ? "Admin User" : "Regular User"}</p>
									</div>

									{isAdmin ? (
										<>
											<Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
												<div className="flex items-center space-x-2">
													<Settings className="h-4 w-4" />
													<span>Dashboard</span>
												</div>
											</Link>
											<button onClick={handleSwitchToUser} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
												<div className="flex items-center space-x-2">
													<User className="h-4 w-4" />
													<span>Switch to User</span>
												</div>
											</button>
										</>
									) : (
										<button onClick={handleSwitchToAdmin} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											<div className="flex items-center space-x-2">
												<Settings className="h-4 w-4" />
												<span>Switch to Admin</span>
											</div>
										</button>
									)}

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
};

export default Header;
