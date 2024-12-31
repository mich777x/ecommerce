// src/context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
	cart: [],
	wishlist: [],
	products: [],
	filters: {
		category: "all",
		priceRange: [0, 5000],
		sort: "featured",
	},
};

const appReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			const existingItem = state.cart.find((item) => item.id === action.payload.id);
			if (existingItem) {
				return {
					...state,
					cart: state.cart.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)),
				};
			}
			return {
				...state,
				cart: [...state.cart, { ...action.payload, quantity: 1 }],
			};

		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload),
			};

		case "UPDATE_CART_QUANTITY":
			return {
				...state,
				cart: state.cart.map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)),
			};

		case "CLEAR_CART":
			return {
				...state,
				cart: [],
			};

		case "TOGGLE_WISHLIST":
			const exists = state.wishlist.find((item) => item.id === action.payload.id);
			if (exists) {
				return {
					...state,
					wishlist: state.wishlist.filter((item) => item.id !== action.payload.id),
				};
			}
			return {
				...state,
				wishlist: [...state.wishlist, action.payload],
			};

		case "CLEAR_WISHLIST":
			return {
				...state,
				wishlist: [],
			};

		case "UPDATE_FILTERS":
			return {
				...state,
				filters: { ...state.filters, ...action.payload },
			};

		default:
			return state;
	}
};

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	// Load cart and wishlist from localStorage on mount
	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		const savedWishlist = localStorage.getItem("wishlist");

		if (savedCart) {
			dispatch({ type: "SET_CART", payload: JSON.parse(savedCart) });
		}
		if (savedWishlist) {
			dispatch({ type: "SET_WISHLIST", payload: JSON.parse(savedWishlist) });
		}
	}, []);

	// Save cart and wishlist to localStorage when they change
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart));
		localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
	}, [state.cart, state.wishlist]);

	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
};

export default AppContext;
