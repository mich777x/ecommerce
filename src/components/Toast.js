import React from "react";

const Toast = ({ message, type = "success", onClose }) => {
	return (
		<div className="fixed bottom-4 right-4 z-50">
			<div className={`px-6 py-3 rounded-lg shadow-lg ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"} text-white flex items-center space-x-3`}>
				<span>{message}</span>
				<button onClick={onClose} className="text-white hover:text-gray-200">
					×
				</button>
			</div>
		</div>
	);
};

export default Toast;
