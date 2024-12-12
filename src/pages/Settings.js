import React, { useState } from "react";
import { Bell, Shield } from "lucide-react";

const Settings = () => {
	const [notifications, setNotifications] = useState({
		email: true,
		push: false,
		orders: true,
		newsletter: false,
	});

	const [privacy, setPrivacy] = useState({
		profileVisible: true,
		showActivity: true,
		allowMessages: false,
	});

	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			<h1 className="text-2xl font-bold mb-8">Settings</h1>

			<div className="space-y-8">
				{/* Notifications */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex items-center space-x-2 mb-6">
						<Bell className="w-5 h-5 text-blue-600" />
						<h2 className="text-xl font-semibold">Notifications</h2>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Email Notifications</h3>
								<p className="text-sm text-gray-600">Receive emails about your orders and account</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" checked={notifications.email} onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })} className="sr-only peer" />
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Push Notifications</h3>
								<p className="text-sm text-gray-600">Receive push notifications on your device</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" checked={notifications.push} onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })} className="sr-only peer" />
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
				</div>

				{/* Privacy */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex items-center space-x-2 mb-6">
						<Shield className="w-5 h-5 text-blue-600" />
						<h2 className="text-xl font-semibold">Privacy</h2>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Profile Visibility</h3>
								<p className="text-sm text-gray-600">Make your profile visible to other users</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" checked={privacy.profileVisible} onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })} className="sr-only peer" />
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Activity Status</h3>
								<p className="text-sm text-gray-600">Show your online status to others</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" checked={privacy.showActivity} onChange={(e) => setPrivacy({ ...privacy, showActivity: e.target.checked })} className="sr-only peer" />
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="flex flex-col md:flex-row gap-4">
					<button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
						<span>Save Changes</span>
					</button>
					<button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
						<span>Cancel</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
