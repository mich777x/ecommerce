import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const location = useLocation();

	// Simple check for authentication
	const isAuthenticated = localStorage.getItem("adminToken");
	const isAdmin = localStorage.getItem("userRole") === "admin";

	if (!isAuthenticated) {
		return <Navigate to="/admin/login" state={{ from: location }} replace />;
	}

	if (!isAdmin) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
