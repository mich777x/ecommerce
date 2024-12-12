import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Search, ShoppingCart, Heart, User, LogOut, Settings, UserCircle } from "lucide-react";

const Header = () => {
	const { state, dispatch } = useApp();
	const { cart, wishlist } = state;
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const userMenuRef = useRef(null);

	// Handle search input change
	const handleSearchChange = (e) => {
		dispatch({
			type: "UPDATE_FILTERS",
			payload: { searchQuery: e.target.value },
		});
	};

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
				setIsUserMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<Link to="/" className="text-2xl font-bold text-gray-900">
						Tech
					</Link>

					<div className="hidden md:flex flex-1 max-w-md mx-4">
						<div className="relative w-full">
							<input type="text" value={state.filters.searchQuery} onChange={handleSearchChange} placeholder="Search premium products..." className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							<Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
						</div>
					</div>

					<div className="flex items-center space-x-6">
						<Link to="/wishlist" className="relative">
							<Heart className="h-6 w-6 text-gray-600 hover:text-red-500" />
							{wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>}
						</Link>

						<Link to="/cart" className="relative">
							<ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-500" />
							{cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</span>}
						</Link>

						<div className="relative" ref={userMenuRef}>
							<button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-1 rounded-full hover:bg-gray-100">
								<User className="h-6 w-6 text-gray-600 hover:text-gray-900" />
							</button>

							{isUserMenuOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
									<div className="px-4 py-3 border-b border-gray-200">
										<p className="text-sm font-medium text-gray-900">Guest User</p>
										<p className="text-sm text-gray-500">guest@example.com</p>
									</div>

									<div className="py-1">
										<Link to="/profile" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
											<UserCircle className="h-4 w-4 mr-3" />
											Profile
										</Link>
										<Link to="/settings" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
											<Settings className="h-4 w-4 mr-3" />
											Settings
										</Link>
										<div className="border-t border-gray-200"></div>
										<button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
											<LogOut className="h-4 w-4 mr-3" />
											Sign Out
										</button>
									</div>
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
