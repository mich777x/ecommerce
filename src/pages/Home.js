import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";
import { useAdmin } from "../context/AdminContext";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

const Home = () => {
	const { state: appState, dispatch: appDispatch } = useApp();
	const { state: adminState } = useAdmin();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");

	// Filter products with safety checks
	const filteredProducts = (adminState.products || []).filter((product) => {
		// Safely check for search matches
		const productName = (product.name || "").toLowerCase();
		const productDescription = (product.description || "").toLowerCase();
		const searchTerm = searchQuery.toLowerCase();

		const matchesSearch =
			searchQuery === "" || // Show all when no search query
			productName.includes(searchTerm) ||
			productDescription.includes(searchTerm);

		const matchesCategory = appState.filters.category === "all" || product.category === appState.filters.category;

		const matchesPriceRange =
			!product.price || // Handle undefined price
			(product.price >= appState.filters.priceRange[0] && product.price <= appState.filters.priceRange[1]);

		return matchesSearch && matchesCategory && matchesPriceRange;
	});

	return (
		<>
			{/* Hero Carousel */}
			<div className="relative bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-96">
						{(adminState.banners || []).map((banner, index) => (
							<div key={banner.id} className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"} ${banner.bgColor}`}>
								<div className="h-full flex flex-col items-center justify-center text-center px-4">
									<h2 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h2>
									<p className="text-xl mb-8">{banner.description}</p>
									<button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">{banner.buttonText}</button>
								</div>
							</div>
						))}

						{(adminState.banners || []).length > 1 && (
							<>
								<button onClick={() => setCurrentSlide((prev) => (prev === 0 ? adminState.banners.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
									<ArrowLeft className="w-6 h-6 text-white" />
								</button>

								<button onClick={() => setCurrentSlide((prev) => (prev === adminState.banners.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
									<ArrowRight className="w-6 h-6 text-white" />
								</button>
							</>
						)}

						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
							{(adminState.banners || []).map((_, index) => (
								<button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? "bg-white" : "bg-white/50"}`} />
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 py-12">
				{/* Search and Filters */}
				<div className="mb-8 flex flex-wrap gap-4 items-center">
					{/* Search Bar */}
					<div className="flex-1 max-w-md">
						<div className="relative">
							<input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
							<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
						</div>
					</div>

					{/* Category Filter */}
					<select
						value={appState.filters.category}
						onChange={(e) =>
							appDispatch({
								type: "UPDATE_FILTERS",
								payload: { category: e.target.value },
							})
						}
						className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">All Categories</option>
						{(adminState.categories || []).map((category) => (
							<option key={category} value={category}>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</option>
						))}
					</select>

					{/* Price Range Filter */}
					<div className="flex items-center space-x-4">
						<span>Price Range:</span>
						<input
							type="range"
							min="0"
							max="5000"
							step="100"
							value={appState.filters.priceRange[1]}
							onChange={(e) =>
								appDispatch({
									type: "UPDATE_FILTERS",
									payload: { priceRange: [0, parseInt(e.target.value)] },
								})
							}
							className="w-48"
						/>
						<span>${appState.filters.priceRange[1]}</span>
					</div>
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</main>
		</>
	);
};

export default Home;
