import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Plus, Edit2, Trash2 } from "lucide-react";

const BannerManagement = () => {
	const { state, dispatch } = useAdmin();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingBanner, setEditingBanner] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		buttonText: "",
		bgColor: "bg-blue-600",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editingBanner) {
			dispatch({
				type: "UPDATE_BANNER",
				payload: { ...formData, id: editingBanner.id },
			});
		} else {
			dispatch({
				type: "ADD_BANNER",
				payload: formData,
			});
		}
		setIsModalOpen(false);
		setEditingBanner(null);
		setFormData({ title: "", description: "", buttonText: "", bgColor: "bg-blue-600" });
	};

	const handleEdit = (banner) => {
		setEditingBanner(banner);
		setFormData(banner);
		setIsModalOpen(true);
	};

	const handleDelete = (bannerId) => {
		if (window.confirm("Are you sure you want to delete this banner?")) {
			dispatch({ type: "DELETE_BANNER", payload: bannerId });
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Banner Management</h2>
				<button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
					<Plus className="w-5 h-5" />
					<span>Add Banner</span>
				</button>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{state.banners.map((banner) => (
					<div key={banner.id} className={`${banner.bgColor} rounded-lg p-6 text-white`}>
						<div className="flex justify-between items-start">
							<div>
								<h3 className="text-xl font-bold mb-2">{banner.title}</h3>
								<p className="mb-4">{banner.description}</p>
								<button className="bg-white text-blue-600 px-4 py-2 rounded-lg">{banner.buttonText}</button>
							</div>
							<div className="flex space-x-2">
								<button onClick={() => handleEdit(banner)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
									<Edit2 className="w-5 h-5" />
								</button>
								<button onClick={() => handleDelete(banner.id)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
									<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h3 className="text-lg font-semibold mb-4">{editingBanner ? "Edit Banner" : "Add New Banner"}</h3>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
								<input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
								<textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
								<input type="text" value={formData.buttonText} onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
								<select value={formData.bgColor} onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="bg-blue-600">Blue</option>
									<option value="bg-purple-600">Purple</option>
									<option value="bg-green-600">Green</option>
									<option value="bg-red-600">Red</option>
								</select>
							</div>
							<div className="flex justify-end space-x-3 mt-6">
								<button
									type="button"
									onClick={() => {
										setIsModalOpen(false);
										setEditingBanner(null);
										setFormData({ title: "", description: "", buttonText: "", bgColor: "bg-blue-600" });
									}}
									className="px-4 py-2 text-gray-600 hover:text-gray-900"
								>
									Cancel
								</button>
								<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
									{editingBanner ? "Save Changes" : "Add Banner"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default BannerManagement;
