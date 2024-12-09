import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Error:", error);
		console.error("Error Info:", errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-50">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong.</h2>
						<p className="text-gray-600 mb-8">We're sorry for the inconvenience. Please try refreshing the page.</p>
						<button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
							Refresh Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
