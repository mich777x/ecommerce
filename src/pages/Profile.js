import React from "react";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const Profile = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				{/* Header/Cover */}
				<div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>

				{/* Profile Info */}
				<div className="relative px-6 pb-6">
					<div className="flex flex-col items-center -mt-20">
						<div className="bg-white p-2 rounded-full shadow-lg">
							<div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
								<User className="w-20 h-20 text-blue-500" />
							</div>
						</div>
						<h1 className="mt-4 text-2xl font-bold">John Doe</h1>
						<p className="text-gray-600">Member since 2024</p>
					</div>

					{/* Details */}
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<h2 className="text-xl font-semibold">Contact Information</h2>
							<div className="space-y-3">
								<div className="flex items-center space-x-3 text-gray-600">
									<Mail className="w-5 h-5" />
									<span>john.doe@example.com</span>
								</div>
								<div className="flex items-center space-x-3 text-gray-600">
									<Phone className="w-5 h-5" />
									<span>+1 (555) 123-4567</span>
								</div>
								<div className="flex items-center space-x-3 text-gray-600">
									<MapPin className="w-5 h-5" />
									<span>New York, USA</span>
								</div>
								<div className="flex items-center space-x-3 text-gray-600">
									<Calendar className="w-5 h-5" />
									<span>Born January 15, 1990</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h2 className="text-xl font-semibold">Account Summary</h2>
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-gray-50 p-4 rounded-lg">
									<div className="text-2xl font-bold text-blue-600">12</div>
									<div className="text-gray-600">Orders</div>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg">
									<div className="text-2xl font-bold text-blue-600">5</div>
									<div className="text-gray-600">Reviews</div>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg">
									<div className="text-2xl font-bold text-blue-600">3</div>
									<div className="text-gray-600">Wishlists</div>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg">
									<div className="text-2xl font-bold text-blue-600">Gold</div>
									<div className="text-gray-600">Member Status</div>
								</div>
							</div>
						</div>
					</div>

					{/* Edit Button */}
					<div className="mt-8">
						<button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Edit Profile</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
