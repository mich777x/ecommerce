import React, { createContext, useContext, useReducer, useEffect } from "react";
import initialProducts from "../data/products";

const AdminContext = createContext();

const initialState = {
	products: [],
	banners: [
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
	categories: ["audio", "cameras", "wearables"],
};

const adminReducer = (state, action) => {
	switch (action.type) {
		case "INIT_PRODUCTS":
			return {
				...state,
				products: action.payload,
			};

		case "ADD_PRODUCT":
			const newProduct = {
				...action.payload,
				id: state.products.length > 0 ? Math.max(...state.products.map((p) => p.id)) + 1 : 1,
			};
			return {
				...state,
				products: [...state.products, newProduct],
			};

		case "UPDATE_PRODUCT":
			return {
				...state,
				products: state.products.map((product) => (product.id === action.payload.id ? { ...product, ...action.payload } : product)),
			};

		case "DELETE_PRODUCT":
			return {
				...state,
				products: state.products.filter((product) => product.id !== action.payload),
			};

		case "ADD_BANNER":
			return {
				...state,
				banners: [...state.banners, { ...action.payload, id: Date.now() }],
			};

		case "UPDATE_BANNER":
			return {
				...state,
				banners: state.banners.map((banner) => (banner.id === action.payload.id ? action.payload : banner)),
			};

		case "DELETE_BANNER":
			return {
				...state,
				banners: state.banners.filter((banner) => banner.id !== action.payload),
			};

		case "ADD_CATEGORY":
			return {
				...state,
				categories: [...state.categories, action.payload],
			};

		case "DELETE_CATEGORY":
			return {
				...state,
				categories: state.categories.filter((category) => category !== action.payload),
			};

		default:
			return state;
	}
};

export const AdminProvider = ({ children }) => {
	const [state, dispatch] = useReducer(adminReducer, initialState);

	// Initialize products when the provider mounts
	useEffect(() => {
		dispatch({
			type: "INIT_PRODUCTS",
			payload: initialProducts,
		});
	}, []);

	// For debugging
	useEffect(() => {
		console.log("Admin State Updated:", state);
	}, [state]);

	return <AdminContext.Provider value={{ state, dispatch }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
	const context = useContext(AdminContext);
	if (!context) {
		throw new Error("useAdmin must be used within an AdminProvider");
	}
	return context;
};

export default AdminContext;
