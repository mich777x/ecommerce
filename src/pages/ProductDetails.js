// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Heart, Share2, Truck, Shield, ArrowLeft, ArrowRight } from "lucide-react";
import products from "../data/products.js"; // Import the products data

const ProductDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { state, dispatch } = useApp();
	const [activeImage, setActiveImage] = useState(0);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		// Find the product with the matching id
		const foundProduct = products.find((p) => p.id === parseInt(id));

		if (foundProduct) {
			setProduct(foundProduct);
		} else {
			// Redirect to home if product not found
			navigate("/");
		}
	}, [id, navigate]);

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	const isWishlisted = state.wishlist.some((item) => item.id === product.id);

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			{/* Breadcrumb */}
			<div className="mb-8">
				<nav className="flex space-x-2 text-sm text-gray-500">
					<button onClick={() => navigate("/")} className="hover:text-blue-600">
						Home
					</button>
					<span>/</span>
					<span>{product.category}</span>
					<span>/</span>
					<span className="text-gray-900">{product.name}</span>
				</nav>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* Product Images */}
				<div className="space-y-4">
					<div className="relative aspect-square">
						<img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover rounded-lg" />
						<button onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
							<ArrowLeft className="w-6 h-6" />
						</button>
						<button onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
							<ArrowRight className="w-6 h-6" />
						</button>
					</div>

					<div className="grid grid-cols-4 gap-4">
						{product.images.map((image, index) => (
							<button key={index} onClick={() => setActiveImage(index)} className={`aspect-square relative ${activeImage === index ? "ring-2 ring-blue-600" : "hover:ring-2 hover:ring-gray-300"}`}>
								<img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
							</button>
						))}
					</div>
				</div>

				{/* Product Info */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

					<div className="flex items-center space-x-4 mb-6">
						<span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
						<span className={`text-sm ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}`}>{product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}</span>
					</div>

					{/* Rating and Reviews */}
					<div className="flex items-center space-x-4 mb-6">
						<div className="flex items-center">
							{[...Array(5)].map((_, i) => (
								<svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							))}
						</div>
						<span className="text-sm text-gray-600">
							{product.rating} ({product.reviews} reviews)
						</span>
					</div>

					<p className="text-gray-600 mb-8">{product.longDescription}</p>

					<div className="flex space-x-4 mb-8">
						<button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })} disabled={product.stock === 0} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
							Add to Cart
						</button>

						<button onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })} className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50">
							<Heart className={`w-6 h-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
						</button>

						<button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50">
							<Share2 className="w-6 h-6 text-gray-600" />
						</button>
					</div>

					{/* Specs */}
					<div className="border-t border-gray-200 pt-8">
						<h2 className="text-xl font-semibold mb-4">Specifications</h2>
						<dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{Object.entries(product.specs).map(([key, value]) => (
								<div key={key}>
									<dt className="text-gray-600">{key}</dt>
									<dd className="font-medium">{value}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* Shipping & Returns */}
					<div className="border-t border-gray-200 mt-8 pt-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="flex items-start space-x-4">
								<Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold">Free Shipping</h3>
									<p className="text-sm text-gray-600">On orders over $50. Delivery in 3-5 business days.</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
								<div>
									<h3 className="font-semibold">2 Year Warranty</h3>
									<p className="text-sm text-gray-600">Full coverage for manufacturing defects.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
