import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Package, Settings, Layout } from "lucide-react";
import ProductManagement from "../admin/components/ProductManagement";
import OrderManagement from "../admin/components/OrderManagement";
import BannerManagement from "../admin/components/BannerManagement";

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState("overview");
	const navigate = useNavigate();

	const handleSwitchToMain = () => {
		localStorage.setItem("userRole", "user");
		navigate("/");
	};

	const renderOverview = () => (
		<div className="space-y-6">
			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{/* ... existing stats ... */}</div>
			<OrderManagement />
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="flex">
				{/* Sidebar */}
				<div className="w-64 bg-white h-screen shadow-lg fixed">
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
						</div>
						<button onClick={handleSwitchToMain} className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
							Switch to Main Site
						</button>
					</div>
					<nav className="p-4">
						<button onClick={() => setActiveTab("overview")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === "overview" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
							<BarChart3 className="w-5 h-5" />
							<span>Overview</span>
						</button>
						<button onClick={() => setActiveTab("products")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === "products" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
							<Package className="w-5 h-5" />
							<span>Products</span>
						</button>
						<button onClick={() => setActiveTab("banners")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === "banners" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
							<Layout className="w-5 h-5" />
							<span>Banners</span>
						</button>
						<button onClick={() => setActiveTab("settings")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
							<Settings className="w-5 h-5" />
							<span>Settings</span>
						</button>
					</nav>
				</div>

				{/* Main Content */}
				<div className="ml-64 flex-1 p-8">
					{activeTab === "overview" && renderOverview()}
					{activeTab === "products" && <ProductManagement />}
					{activeTab === "banners" && <BannerManagement />}
					{activeTab === "settings" && (
						<div className="bg-white rounded-lg shadow p-6">
							<h2 className="text-lg font-semibold mb-4">Settings</h2>
							<p className="text-gray-600">Settings panel coming soon...</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
