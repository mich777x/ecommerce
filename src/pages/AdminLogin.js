import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogin = (e) => {
		e.preventDefault();
		try {
			// This is a mock authentication
			// In a real application, you would make an API call
			if (email === "admin@example.com" && password === "admin123") {
				localStorage.setItem("adminToken", "mock-jwt-token");
				localStorage.setItem("userRole", "admin");

				// Redirect to the originally requested URL or admin dashboard
				const from = location.state?.from?.pathname || "/admin";
				navigate(from, { replace: true });
			} else {
				setError("Invalid credentials");
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("An error occurred during login");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="max-w-md w-full mx-4">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
							<Lock className="w-8 h-8 text-blue-600" />
						</div>
						<h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
						<p className="text-gray-600 mt-2">Sign in to access the admin dashboard</p>
					</div>

					{error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

					<form onSubmit={handleLogin} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
								Email Address
							</label>
							<input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="admin@example.com" required />
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required />
						</div>

						<button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
							Sign In
						</button>
					</form>

					<div className="mt-6 text-center text-sm text-gray-600">
						<p>Demo credentials:</p>
						<p>Email: admin@example.com</p>
						<p>Password: admin123</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
