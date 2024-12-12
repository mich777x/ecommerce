import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Trash2, Plus, Minus } from "lucide-react";

const Cart = () => {
	const { state, dispatch } = useApp();
	const { cart } = state;

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const updateQuantity = (id, quantity) => {
		if (quantity < 1) return;
		dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
	};

	if (cart.length === 0) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-12 text-center">
				<h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
				<p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
				<Link to="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
					Continue Shopping
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					{cart.map((item) => (
						<div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 py-4">
							<img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />

							<div className="flex-1">
								<Link to={`/product/${item.id}`} className="font-semibold hover:text-blue-600">
									{item.name}
								</Link>
								<p className="text-gray-600">${item.price.toFixed(2)}</p>
							</div>

							<div className="flex items-center space-x-2">
								<button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-lg hover:bg-gray-100">
									<Minus className="w-4 h-4" />
								</button>
								<span className="w-8 text-center">{item.quantity}</span>
								<button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-lg hover:bg-gray-100">
									<Plus className="w-4 h-4" />
								</button>
							</div>

							<button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
								<Trash2 className="w-5 h-5" />
							</button>
						</div>
					))}
				</div>

				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg shadow-lg p-6">
						<h3 className="text-lg font-semibold mb-4">Order Summary</h3>

						<div className="space-y-2 mb-4">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>${total.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<span>Free</span>
							</div>
						</div>

						<div className="border-t border-gray-200 pt-4 mb-6">
							<div className="flex justify-between font-semibold">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>

						<button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Proceed to Checkout</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
