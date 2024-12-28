import React, { useState } from "react";
import { Search } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const OrderManagement = () => {
	const { dispatch } = useAdmin();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateRange, setDateRange] = useState("all");

	// Mock orders data (replace with real data in production)
	const orders = [
		{
			id: "1",
			customer: {
				name: "DemoUser",
				email: "DemoUser@example.com",
			},
			items: [{ id: 1, name: "Wireless Earbuds", quantity: 1, price: 299.99 }],
			total: 299.99,
			status: "pending",
			date: "2024-12-22",
		},
		// Add more mock orders here
	];

	const handleStatusChange = (orderId, newStatus) => {
		dispatch({
			type: "UPDATE_ORDER_STATUS",
			payload: { id: orderId, status: newStatus },
		});
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "processing":
				return "bg-blue-100 text-blue-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const filterOrders = () => {
		return orders.filter((order) => {
			const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesStatus = statusFilter === "all" || order.status === statusFilter;

			// Add date filtering logic here if needed

			return matchesSearch && matchesStatus;
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Order Management</h2>
			</div>

			{/* Filters */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
				</div>

				<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
					<option value="all">All Statuses</option>
					<option value="pending">Pending</option>
					<option value="processing">Processing</option>
					<option value="completed">Completed</option>
					<option value="cancelled">Cancelled</option>
				</select>

				<select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
					<option value="all">All Time</option>
					<option value="today">Today</option>
					<option value="week">This Week</option>
					<option value="month">This Month</option>
				</select>
			</div>

			{/* Orders Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filterOrders().map((order) => (
							<tr key={order.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="text-sm font-medium text-gray-900">#{order.id}</span>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-gray-900">{order.customer.name}</div>
									<div className="text-sm text-gray-500">{order.customer.email}</div>
								</td>
								<td className="px-6 py-4">
									<div className="text-sm text-gray-900">
										{order.items.map((item) => (
											<div key={item.id}>
												{item.quantity}x {item.name}
											</div>
										))}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
										<option value="pending">Pending</option>
										<option value="processing">Processing</option>
										<option value="completed">Completed</option>
										<option value="cancelled">Cancelled</option>
									</select>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button
										onClick={() => {
											/* Add view details handler */
										}}
										className="text-blue-600 hover:text-blue-900"
									>
										View Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderManagement;
