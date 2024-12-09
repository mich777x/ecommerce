import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";
import { Filter, ArrowLeft, ArrowRight } from "lucide-react";
import products from "../data/products";

const Home = () => {
	const { state, dispatch } = useApp();
	const [currentSlide, setCurrentSlide] = useState(0);

	const banners = [
		{
			title: "Premium Tech Deals",
			description: "Exclusive offers on high-end electronics",
			buttonText: "Shop Now",
			bgColor: "bg-blue-600",
		},
		{
			title: "New Arrivals",
			description: "Discover the latest in technology",
			buttonText: "Explore",
			bgColor: "bg-purple-600",
		},
	];

	// Updated filtering logic with safe property access
	const filteredProducts = products.filter((product) => {
		if (!product) return false;

		// Filter by category
		if (state.filters.category !== "all" && product.category && product.category !== state.filters.category) {
			return false;
		}

		// Filter by price range
		if (typeof product.price === "number" && (product.price < state.filters.priceRange[0] || product.price > state.filters.priceRange[1])) {
			return false;
		}

		// Filter by search query
		if (state.filters.searchQuery) {
			const searchTerm = state.filters.searchQuery.toLowerCase();
			const productName = (product.name || "").toLowerCase();
			const productDescription = (product.description || "").toLowerCase();
			const productCategory = (product.category || "").toLowerCase();

			return productName.includes(searchTerm) || productDescription.includes(searchTerm) || productCategory.includes(searchTerm);
		}

		return true;
	});

	// Sort products with null checks
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (!a || !b) return 0;

		switch (state.filters.sort) {
			case "price-low":
				return (a.price || 0) - (b.price || 0);
			case "price-high":
				return (b.price || 0) - (a.price || 0);
			case "rating":
				return (b.rating || 0) - (a.rating || 0);
			default:
				return 0;
		}
	});

	return (
		<>
			{/* Hero Carousel */}
			<div className="relative bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-96">
						{banners.map((banner, index) => (
							<div key={index} className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"} ${banner.bgColor}`}>
								<div className="h-full flex flex-col items-center justify-center text-center px-4">
									<h2 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h2>
									<p className="text-xl mb-8">{banner.description}</p>
									<button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">{banner.buttonText}</button>
								</div>
							</div>
						))}

						<button onClick={() => setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
							<ArrowLeft className="w-6 h-6 text-white" />
						</button>

						<button onClick={() => setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
							<ArrowRight className="w-6 h-6 text-white" />
						</button>

						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
							{banners.map((_, index) => (
								<button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? "bg-white" : "bg-white/50"}`} />
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 py-12">
				{/* Filters */}
				<div className="mb-8 flex flex-wrap gap-4 items-center">
					<div className="flex items-center space-x-2">
						<Filter className="w-5 h-5" />
						<span className="font-semibold">Filters:</span>
					</div>

					<select
						value={state.filters.category}
						onChange={(e) =>
							dispatch({
								type: "UPDATE_FILTERS",
								payload: { category: e.target.value },
							})
						}
						className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">All Categories</option>
						<option value="audio">Audio</option>
						<option value="wearables">Wearables</option>
						<option value="cameras">Cameras</option>
					</select>

					<select
						value={state.filters.sort}
						onChange={(e) =>
							dispatch({
								type: "UPDATE_FILTERS",
								payload: { sort: e.target.value },
							})
						}
						className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="featured">Featured</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
						<option value="rating">Highest Rated</option>
					</select>

					<div className="flex items-center space-x-4">
						<span>Price Range:</span>
						<input
							type="range"
							min="0"
							max="5000"
							step="100"
							value={state.filters.priceRange[1]}
							onChange={(e) =>
								dispatch({
									type: "UPDATE_FILTERS",
									payload: { priceRange: [0, parseInt(e.target.value)] },
								})
							}
							className="w-48"
						/>
						<span>${state.filters.priceRange[1]}</span>
					</div>
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{sortedProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				{/* Newsletter Section */}
				<section className="mt-16 bg-blue-600 text-white py-16 rounded-lg">
					<div className="max-w-2xl mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-4">Join Our Premium Club</h2>
						<p className="text-lg mb-8">Get exclusive access to new arrivals and special offers</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<input type="email" placeholder="Enter your email" className="px-6 py-3 rounded-lg text-gray-900 flex-1 focus:outline-none focus:ring-2 focus:ring-white" />
							<button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Subscribe</button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;
