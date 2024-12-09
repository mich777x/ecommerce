import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, StarHalf } from "lucide-react";
import { useApp } from "../context/AppContext";

const ProductCard = ({ product }) => {
	const { state, dispatch } = useApp();
	const isWishlisted = state.wishlist.some((item) => item.id === product.id);

	const renderRating = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;

		for (let i = 0; i < fullStars; i++) {
			stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
		}
		if (hasHalfStar) {
			stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
		}
		return stars;
	};

	return (
		<div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
			<div className="relative">
				<Link to={`/product/${product.id}`}>
					<img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
				</Link>
				<button onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })} className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
					<Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
				</button>
			</div>

			<div className="p-6">
				<Link to={`/product/${product.id}`}>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
				</Link>
				<p className="text-gray-600 mb-4">{product.description}</p>

				<div className="flex items-center space-x-2 mb-4">
					<div className="flex">{renderRating(product.rating)}</div>
					<span className="text-sm text-gray-500">({product.reviews})</span>
				</div>

				<div className="flex items-center justify-between mb-6">
					<span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
					<span className={`text-sm ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}`}>{product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}</span>
				</div>

				<button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })} disabled={product.stock === 0} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
