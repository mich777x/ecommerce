export const products = [
	{
		id: 1,
		name: "Premium Wireless Earbuds Pro",
		price: 299.99,
		image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
		images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500", "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500", "https://images.unsplash.com/photo-1631867675167-90a456a90863?w=500"],
		description: "Hi-Fi wireless earbuds with active noise cancellation",
		longDescription: `Experience premium audio with our flagship wireless earbuds. 
    Features include adaptive noise cancellation, transparency mode, and Hi-Res audio certification. 
    The custom-designed drivers deliver exceptional clarity and deep bass response.`,
		category: "audio",
		rating: 4.8,
		reviews: 1245,
		stock: 50,
		specs: {
			Driver: "12mm Bio-cellulose",
			Battery: "8h + 24h case",
			"Noise Cancellation": "Hybrid ANC",
			"Water Resistance": "IPX5",
			Bluetooth: "5.3 with aptX HD",
		},
	},
	{
		id: 2,
		name: "Studio Monitor Headphones",
		price: 349.99,
		image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
		images: ["https://images.unsplash.com/photo-1599669454699-248893623440?w=500", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500", "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=500"],
		longDescription: `Designed for professional audio production and critical listening. 
    Features include swappable cables, memory foam cushions, and precision-tuned drivers. 
    Used by top music producers and audio engineers worldwide.`,
		category: "audio",
		rating: 4.9,
		reviews: 892,
		stock: 35,
		specs: {
			Driver: "45mm Beryllium",
			"Frequency Response": "5Hz-40kHz",
			Impedance: "32 ohms",
			Cable: "Detachable 3m",
			Weight: "320g",
		},
	},
	{
		id: 3,
		name: "Smart Hi-Fi Speaker",
		price: 599.99,
		image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
		images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500", "https://images.unsplash.com/photo-1603489236264-9e44015520fb?w=500", "https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=500"],
		description: "Wireless smart speaker with room calibration",
		longDescription: `Fill your room with rich, detailed sound from this premium wireless speaker. 
    Features automatic room calibration, multi-room audio support, and high-resolution streaming. 
    Voice control and app integration included.`,
		category: "audio",
		rating: 4.7,
		reviews: 634,
		stock: 25,
		specs: {
			Drivers: "Woofer + 2x Tweeters",
			Power: "100W Total",
			Connectivity: "WiFi 6, Bluetooth 5.2",
			Streaming: "AirPlay 2, Spotify Connect",
			Dimensions: "180x180x200mm",
		},
	},
	// Camera Category
	{
		id: 4,
		name: "Pro Mirrorless Camera",
		price: 2799.99,
		image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
		images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500", "https://images.unsplash.com/photo-1500646953400-455ab0c5eb44?w=500", "https://images.unsplash.com/photo-1613284155618-24d869297e5d?w=500"],
		description: "Professional full-frame mirrorless camera",
		longDescription: `Capture stunning photos and videos with this professional mirrorless camera. 
    Features include a high-resolution sensor, advanced autofocus, and 8K video recording. 
    Weather-sealed construction for professional reliability.`,
		category: "cameras",
		rating: 4.9,
		reviews: 467,
		stock: 15,
		specs: {
			Sensor: "45.7MP Full-Frame",
			ISO: "64-51200",
			Video: "8K30p, 4K120p",
			Stabilization: "5-axis IBIS",
			Storage: "Dual CFexpress",
		},
	},
	{
		id: 5,
		name: "Compact Travel Camera",
		price: 899.99,
		image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=500",
		images: ["https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=500", "https://images.unsplash.com/photo-1494048604570-db50064e1e16?w=500", "https://images.unsplash.com/photo-1542124292-70e2d33d2965?w=500", "https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=500"],
		longDescription: `Perfect for travelers and street photographers, this compact camera delivers 
    professional image quality in a portable package. Features a large sensor, fast lens, and 
    advanced stabilization.`,
		category: "cameras",
		rating: 4.7,
		reviews: 823,
		stock: 30,
		specs: {
			Sensor: "24MP APS-C",
			Lens: "24-70mm f/2.8",
			Screen: '3" Tilting Touch',
			Video: "4K60p HDR",
			Weight: "465g",
		},
	},
	// Wearable Category
	{
		id: 6,
		name: "Advanced Fitness Watch",
		price: 349.99,
		image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
		images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500", "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=500", "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500", "https://images.unsplash.com/photo-1628803290822-85dcabd2d6d3?w=500"],
		description: "Premium fitness tracker with health monitoring",
		longDescription: `Track your health and fitness with our most advanced smartwatch. 
    Features include ECG monitoring, blood oxygen tracking, and advanced sleep analysis. 
    Includes built-in GPS and 14-day battery life.`,
		category: "wearables",
		rating: 4.8,
		reviews: 1567,
		stock: 45,
		specs: {
			Display: '1.4" AMOLED',
			Battery: "14 days typical",
			"Water Rating": "5ATM",
			Sensors: "Heart, SpO2, ECG",
			GPS: "Multi-band GNSS",
		},
	},
	{
		id: 7,
		name: "Smart Health Ring",
		price: 299.99,
		image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
		images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500", "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=500", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500", "https://images.unsplash.com/photo-1604519190383-501dce3c8a0f?w=500"],
		description: "Health monitoring smart ring",
		longDescription: `Monitor your health discreetly with this innovative smart ring. 
    Tracks sleep patterns, activity, and vital signs with medical-grade accuracy. 
    Perfect for those wanting health insights without a traditional wearable.`,
		category: "wearables",
		rating: 4.6,
		reviews: 892,
		stock: 25,
		specs: {
			Sensors: "Heart, Temperature",
			Battery: "7 days",
			"Water Resistance": "3ATM",
			Material: "Titanium",
			Sizes: "6-13 US",
		},
	},
];

export const categories = ["Audio", "Cameras", "Wearables"];

export default products;
