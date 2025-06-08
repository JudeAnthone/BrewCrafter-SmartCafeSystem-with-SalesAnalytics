const jwt = require("jsonwebtoken");

const adminOnly = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ message: "No token provided" });

	// Token restriction
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (decoded.role !== 1 && decoded.role !== "admin") {
			return res.status(403).json({ message: "Access Denied: Admins only" });
		}
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid Token " });
	}
};

module.exports = adminOnly;