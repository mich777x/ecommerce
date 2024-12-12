import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Trash2, ShoppingCart } from "lucide-react";

const Wishlist = () => {
	const { state, dispatch } = useApp();
	const { wishlist } = state;

	if (wishlist.length === 0) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-12 text-center">
				<h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
				<p className="text-gray-600 mb-8">Save items you'd like to purchase later by adding them to your wishlist.</p>
				<Link to="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
					Explore Products
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<h2 className="text-2xl font-bold mb-8">My Wishlist</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{wishlist.map((item) => (
					<div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
						<Link to={`/product/${item.id}`}>
							<img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
						</Link>

						<div className="p-6">
							<Link to={`/product/${item.id}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2 block">
								{item.name}
							</Link>

							<p className="text-gray-600 mb-4">{item.description}</p>

							<div className="flex items-center justify-between mb-6">
								<span className="text-2xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
								<span className={`text-sm ${item.stock > 10 ? "text-green-600" : item.stock > 0 ? "text-orange-600" : "text-red-600"}`}>{item.stock > 10 ? "In Stock" : item.stock > 0 ? `Only ${item.stock} left` : "Out of Stock"}</span>
							</div>

							<div className="flex space-x-4">
								<button onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })} disabled={item.stock === 0} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
									<ShoppingCart className="w-5 h-5" />
									<span>Add to Cart</span>
								</button>

								<button onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: item })} className="p-3 text-red-500 hover:bg-red-50 rounded-lg">
									<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Wishlist;
