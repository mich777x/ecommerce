import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
	cart: [],
	wishlist: [],
	user: null,
	filters: {
		category: "all",
		priceRange: [0, 5000],
		sort: "featured",
		searchQuery: "", // Added search query to filters
	},
};

const reducer = (state, action) => {
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

		case "UPDATE_QUANTITY":
			return {
				...state,
				cart: state.cart.map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)),
			};

		case "TOGGLE_WISHLIST":
			const exists = state.wishlist.find((item) => item.id === action.payload.id);
			return {
				...state,
				wishlist: exists ? state.wishlist.filter((item) => item.id !== action.payload.id) : [...state.wishlist, action.payload],
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
	const [state, dispatch] = useReducer(reducer, initialState);
	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
