// src/pages/AdminLogin.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

const AdminLogin = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const hasAdminSession = localStorage.getItem("adminSession") === "true";
		const isAdmin = localStorage.getItem("userRole") === "admin";

		if (hasAdminSession && isAdmin) {
			navigate("/admin");
		}
	}, [navigate]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setError("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.email === "admin@example.com" && formData.password === "admin123") {
			localStorage.setItem("adminToken", "demo-token");
			localStorage.setItem("userRole", "admin");
			localStorage.setItem("adminSession", "true");
			navigate("/admin");
		} else {
			setError("Invalid credentials");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<div className="flex justify-center">
						<div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
							<Lock className="w-10 h-10 text-white" />
						</div>
					</div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
					<p className="mt-2 text-center text-sm text-gray-600">Access the admin dashboard</p>
				</div>

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
						<AlertCircle className="h-5 w-5 mr-2" />
						{error}
					</div>
				)}

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div className="mt-1 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="admin@example.com" />
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
									{showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
								</button>
							</div>
						</div>
					</div>

					<div>
						<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							Sign in
						</button>
					</div>

					{/* Demo credentials */}
					<div className="mt-4">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-50 text-gray-500">Demo Credentials</span>
							</div>
						</div>
						<div className="mt-4 text-center text-sm text-gray-600">
							<p>Email: admin@example.com</p>
							<p>Password: admin123</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
