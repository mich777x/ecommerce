// Authentication utilities
export const loginAdmin = (credentials) => {
	// In production, this would be an API call
	if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
		localStorage.setItem("adminToken", "mock-jwt-token");
		localStorage.setItem("userRole", "admin");
		return true;
	}
	return false;
};

export const logoutAdmin = () => {
	localStorage.removeItem("adminToken");
	localStorage.removeItem("userRole");
};

export const isAuthenticated = () => {
	const token = localStorage.getItem("adminToken");
	return !!token;
};

// Format utilities
export const formatCurrency = (amount) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const formatDate = (date) => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

// Mock data generators
export const generateMockStats = () => ({
	totalRevenue: 25999.99,
	totalOrders: 142,
	totalCustomers: 98,
	averageOrderValue: 183.09,
	revenueGrowth: 12.5,
	orderGrowth: 8.2,
	customerGrowth: 15.3,
});
