// src/context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

// Initial state for authentication
const initialState = {
	isAuthenticated: false,
	user: null,
	loading: true,
	error: null,
};

// Auth reducer to handle state updates
const authReducer = (state, action) => {
	switch (action.type) {
		case "AUTH_INIT":
			return {
				...state,
				loading: false,
			};

		case "LOGIN_SUCCESS":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				loading: false,
				error: null,
			};

		case "LOGIN_ERROR":
			return {
				...state,
				isAuthenticated: false,
				user: null,
				loading: false,
				error: action.payload,
			};

		case "LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				user: null,
				loading: false,
				error: null,
			};

		case "CLEAR_ERROR":
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Check authentication status on mount
	useEffect(() => {
		const initializeAuth = () => {
			try {
				const token = localStorage.getItem("adminToken");
				const userData = localStorage.getItem("userData");

				if (token && userData) {
					dispatch({
						type: "LOGIN_SUCCESS",
						payload: JSON.parse(userData),
					});
				}
			} catch (error) {
				console.error("Auth initialization error:", error);
			}

			dispatch({ type: "AUTH_INIT" });
		};

		initializeAuth();
	}, []);

	// Login function
	const login = async (email, password) => {
		try {
			// For demo purposes using hardcoded credentials
			if (email === "admin@example.com" && password === "admin123") {
				const userData = {
					id: "1",
					email: email,
					name: "Admin User",
					role: "admin",
				};

				// Store auth data
				localStorage.setItem("adminToken", "demo-token");
				localStorage.setItem("userData", JSON.stringify(userData));

				dispatch({
					type: "LOGIN_SUCCESS",
					payload: userData,
				});

				return true;
			} else {
				throw new Error("Invalid credentials");
			}
		} catch (error) {
			dispatch({
				type: "LOGIN_ERROR",
				payload: error.message,
			});
			return false;
		}
	};

	// Logout function
	const logout = () => {
		localStorage.removeItem("adminToken");
		localStorage.removeItem("userData");
		dispatch({ type: "LOGOUT" });
	};

	// Clear any error messages
	const clearError = () => {
		dispatch({ type: "CLEAR_ERROR" });
	};

	// Check if user has admin role
	const isAdmin = () => {
		return state.user?.role === "admin";
	};

	// Context value
	const value = {
		...state,
		login,
		logout,
		clearError,
		isAdmin,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export default AuthContext;
