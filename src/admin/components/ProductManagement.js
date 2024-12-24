import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useApp } from "../../context/AppContext";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

const ProductManagement = () => {
	const { state: adminState, dispatch: adminDispatch } = useAdmin();
	const { dispatch: appDispatch } = useApp();
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		category: "",
		description: "",
		stock: "",
		image: "",
		rating: "0",
		reviews: "0",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const productData = {
			...formData,
			id: editingProduct ? editingProduct.id : Date.now(),
			price: Number(formData.price),
			stock: Number(formData.stock),
			rating: Number(formData.rating),
			reviews: Number(formData.reviews),
			images: [formData.image],
			longDescription: formData.description,
		};

		if (editingProduct) {
			// Update in both contexts
			adminDispatch({
				type: "UPDATE_PRODUCT",
				payload: productData,
			});
			appDispatch({
				type: "UPDATE_PRODUCT",
				payload: productData,
			});
		} else {
			// Add to both contexts
			adminDispatch({
				type: "ADD_PRODUCT",
				payload: productData,
			});
			appDispatch({
				type: "ADD_PRODUCT",
				payload: productData,
			});
		}

		setIsModalOpen(false);
		setEditingProduct(null);
		setFormData({
			name: "",
			price: "",
			category: "",
			description: "",
			stock: "",
			image: "",
			rating: "0",
			reviews: "0",
		});
	};

	const handleDelete = (productId) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			// Delete from both contexts
			adminDispatch({
				type: "DELETE_PRODUCT",
				payload: productId,
			});
			appDispatch({
				type: "DELETE_PRODUCT",
				payload: productId,
			});
		}
	};

	const handleEdit = (product) => {
		setEditingProduct(product);
		setFormData({
			name: product.name || "",
			price: product.price?.toString() || "",
			category: product.category || "",
			description: product.description || "",
			stock: product.stock?.toString() || "",
			image: product.image || product.images?.[0] || "",
			rating: product.rating?.toString() || "0",
			reviews: product.reviews?.toString() || "0",
		});
		setIsModalOpen(true);
	};

	// Filter products based on search term
	const filteredProducts = adminState.products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Product Management</h2>
				<button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
					<Plus className="w-5 h-5" />
					<span>Add Product</span>
				</button>
			</div>

			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
				<input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
			</div>

			<div className="bg-white rounded-lg shadow overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredProducts.map((product) => (
							<tr key={product.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
										<img src={product.image || product.images?.[0]} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
										<div className="ml-4">
											<div className="text-sm font-medium text-gray-900">{product.name}</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{product.category}</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 10 ? "bg-green-100 text-green-800" : product.stock > 0 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{product.stock} units</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 mr-4">
										<Edit2 className="w-5 h-5" />
									</button>
									<button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
										<Trash2 className="w-5 h-5" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Add/Edit Product Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h3 className="text-lg font-semibold mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
								<input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
									<input type="number" required min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
									<input type="number" required min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
								<select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
									<option value="">Select category</option>
									<option value="audio">Audio</option>
									<option value="cameras">Cameras</option>
									<option value="wearables">Wearables</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
								<textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
								<input type="url" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
									<input type="number" required min="0" max="5" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
									<input type="number" required min="0" value={formData.reviews} onChange={(e) => setFormData({ ...formData, reviews: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
								</div>
							</div>

							<div className="flex justify-end space-x-3 mt-6">
								<button
									type="button"
									onClick={() => {
										setIsModalOpen(false);
										setEditingProduct(null);
										setFormData({
											name: "",
											price: "",
											category: "",
											description: "",
											stock: "",
											image: "",
											rating: "0",
											reviews: "0",
										});
									}}
									className="px-4 py-2 text-gray-600 hover:text-gray-900"
								>
									Cancel
								</button>
								<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
									{editingProduct ? "Save Changes" : "Add Product"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductManagement;
