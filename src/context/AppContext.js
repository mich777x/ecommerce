import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
	cart: [],
	wishlist: [],
	searchQuery: "",
	products: [], // Add products to main state
	filters: {
		category: "all",
		priceRange: [0, 5000],
		sort: "featured",
	},
	banners: [
		// Add banners to main state
		{
			id: 1,
			title: "Premium Tech Deals",
			description: "Exclusive offers on high-end electronics",
			buttonText: "Shop Now",
			bgColor: "bg-blue-600",
		},
		{
			id: 2,
			title: "New Arrivals",
			description: "Discover the latest in technology",
			buttonText: "Explore",
			bgColor: "bg-purple-600",
		},
	],
};

const appReducer = (state, action) => {
	switch (action.type) {
		case "SET_PRODUCTS":
			return {
				...state,
				products: action.payload,
			};

		case "ADD_PRODUCT":
			return {
				...state,
				products: [...state.products, action.payload],
			};

		case "UPDATE_PRODUCT":
			return {
				...state,
				products: state.products.map((product) => (product.id === action.payload.id ? action.payload : product)),
			};

		case "DELETE_PRODUCT":
			return {
				...state,
				products: state.products.filter((product) => product.id !== action.payload),
			};

		// Banner Management Actions
		case "UPDATE_BANNERS":
			return {
				...state,
				banners: action.payload,
			};
		case "ADD_TO_CART": {
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
		}

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

		case "TOGGLE_WISHLIST": {
			const existingItem = state.wishlist.find((item) => item.id === action.payload.id);

			return {
				...state,
				wishlist: existingItem ? state.wishlist.filter((item) => item.id !== action.payload.id) : [...state.wishlist, action.payload],
			};
		}

		case "UPDATE_FILTERS":
			return {
				...state,
				filters: { ...state.filters, ...action.payload },
			};

		case "SET_SEARCH_QUERY":
			return {
				...state,
				searchQuery: action.payload,
			};

		case "CLEAR_SEARCH_QUERY":
			return {
				...state,
				searchQuery: "",
			};

		default:
			return state;
	}
};

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	// For debugging
	console.log("App Context State:", state);

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
