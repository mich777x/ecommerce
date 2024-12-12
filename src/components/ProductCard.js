import React, { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
	const [imageError, setImageError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	const handleImageError = () => {
		setImageError(true);
		setIsLoading(false);
	};

	const renderRating = (rating) => {
		return [...Array(5)].map((_, index) => <Star key={index} className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />);
	};

	return (
		<div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
			<div className="relative aspect-[4/3]">
				{isLoading && (
					<div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
						<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
					</div>
				)}

				{imageError ? (
					<div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
						<div className="text-gray-400 text-center p-4">
							<div className="mb-2">📷</div>
							<div className="text-sm">Image unavailable</div>
						</div>
					</div>
				) : (
					<Link to={`/product/${product.id}`}>
						<img src={product.image} alt={product.name} className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`} onLoad={handleImageLoad} onError={handleImageError} />
					</Link>
				)}

				<button onClick={() => onToggleWishlist(product)} className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-300">
					<Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
				</button>
			</div>

			<div className="p-6">
				<Link to={`/product/${product.id}`} className="block mb-2 hover:text-blue-600 transition-colors">
					<h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
				</Link>

				<p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

				<div className="flex items-center space-x-2 mb-4">
					<div className="flex space-x-1">{renderRating(product.rating)}</div>
					<span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
				</div>

				<div className="flex items-center justify-between mb-4">
					<span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
					<span className={`text-sm px-2 py-1 rounded-full ${product.stock > 10 ? "bg-green-100 text-green-800" : product.stock > 0 ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}>{product.stock > 10 ? "In Stock" : product.stock > 0 ? `${product.stock} left` : "Out of Stock"}</span>
				</div>

				<button onClick={() => (product.stock > 0 ? onAddToCart(product) : null)} disabled={product.stock === 0} className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600">
					<ShoppingCart className="w-5 h-5" />
					<span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
