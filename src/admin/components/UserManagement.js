import React, { useState } from "react";
import { UserPlus, Trash2, Lock, Unlock } from "lucide-react";

// Mock users data
const initialUsers = [
	{
		id: 1,
		username: "johndoe",
		email: "john.doe@example.com",
		role: "customer",
		status: "active",
		createdAt: "2023-06-15",
	},
	{
		id: 2,
		username: "janeadmin",
		email: "jane.admin@example.com",
		role: "admin",
		status: "active",
		createdAt: "2023-01-10",
	},
];

const UsersManagement = () => {
	const [users, setUsers] = useState(initialUsers);
	const [isAddingUser, setIsAddingUser] = useState(false);
	const [newUser, setNewUser] = useState({
		username: "",
		email: "",
		role: "customer",
	});

	const addUser = () => {
		if (!newUser.username || !newUser.email) {
			alert("Please fill in all fields");
			return;
		}

		const userToAdd = {
			...newUser,
			id: Date.now(),
			status: "active",
			createdAt: new Date().toISOString().split("T")[0],
		};

		setUsers([...users, userToAdd]);

		// Reset form
		setNewUser({
			username: "",
			email: "",
			role: "customer",
		});
		setIsAddingUser(false);
	};

	const toggleUserStatus = (userId) => {
		setUsers(users.map((user) => (user.id === userId ? { ...user, status: user.status === "active" ? "blocked" : "active" } : user)));
	};

	const deleteUser = (userId) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			setUsers(users.filter((user) => user.id !== userId));
		}
	};

	const renderStatusBadge = (status) => {
		const statusColors = {
			active: "bg-green-100 text-green-800",
			blocked: "bg-red-100 text-red-800",
		};

		return <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>{status}</span>;
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">User Management</h1>
				<button onClick={() => setIsAddingUser(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
					<UserPlus className="mr-2 w-5 h-5" /> Add User
				</button>
			</div>

			{/* Add User Form */}
			{isAddingUser && (
				<div className="bg-white shadow-md rounded-lg p-6 mb-6">
					<h2 className="text-xl font-semibold mb-4">Add New User</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="p-2 border rounded" />
						<input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="p-2 border rounded" />
						<select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="p-2 border rounded">
							<option value="customer">Customer</option>
							<option value="admin">Admin</option>
						</select>
						<div className="col-span-full flex space-x-2">
							<button onClick={addUser} className="bg-green-600 text-white px-4 py-2 rounded-lg">
								Create User
							</button>
							<button onClick={() => setIsAddingUser(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Users List */}
			<div className="bg-white shadow-md rounded-lg">
				<table className="w-full">
					<thead>
						<tr className="bg-gray-100 border-b">
							<th className="p-3 text-left">Username</th>
							<th className="p-3 text-left">Email</th>
							<th className="p-3 text-left">Role</th>
							<th className="p-3 text-left">Created At</th>
							<th className="p-3 text-left">Status</th>
							<th className="p-3 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id} className="border-b hover:bg-gray-50">
								<td className="p-3">{user.username}</td>
								<td className="p-3">{user.email}</td>
								<td className="p-3">
									<span className={`px-2 py-1 rounded-full text-xs ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>{user.role}</span>
								</td>
								<td className="p-3">{user.createdAt}</td>
								<td className="p-3">{renderStatusBadge(user.status)}</td>
								<td className="p-3 space-x-2 flex">
									<button
										onClick={() => toggleUserStatus(user.id)}
										className={`
                                            p-2 rounded 
                                            ${user.status === "active" ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}
                                        `}
									>
										{user.status === "active" ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
									</button>
									<button onClick={() => deleteUser(user.id)} className="text-red-600 hover:bg-red-50 p-2 rounded">
										<Trash2 className="w-5 h-5" />
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

export default UsersManagement;
