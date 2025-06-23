
const pool = require("../config/db-connection");
const path = require('path');

// Get all the products
exports.getAllProducts = async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM brewcrafter.products ORDER BY created_at DESC"
		);
		// Prepend image_url with server address if present
		const products = result.rows.map(product => ({
			...product,
			image_url: product.image_url ? `${req.protocol}://${req.get('host')}/${product.image_url.replace(/\\/g, '/')}` : null
		}));
		res.json(products);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch products" });
	}
};


// Adding new product
exports.addProduct = async (req, res) => {
	const {
		category_id,
		product_name,
		product_description,
		product_price,
		is_available,
		is_popular,
		ingredients,
	} = req.body;
	let image_url = null;
	if (req.file) {
		image_url = path.join('uploads/products', req.file.filename).replace(/\\/g, '/');
	}
	try {
		const result = await pool.query(
			`INSERT INTO brewcrafter.products (category_id, product_name, product_description, product_price, image_url, is_available, is_popular, ingredients)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
			[
				category_id,
				product_name,
				product_description,
				product_price,
				image_url,
				is_available,
				is_popular,
				ingredients ? JSON.parse(ingredients) : [],
			]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ message: "Failed to add Product" });
	}
};


// Update a product
exports.updateProduct = async (req, res) => {
	const { id } = req.params;
	const {
		category_id,
		product_name,
		product_description,
		product_price,
		is_available,
		is_popular,
		ingredients,
	} = req.body;
	let image_url = req.body.image_url || null;
	if (req.file) {
		image_url = path.join('uploads/products', req.file.filename).replace(/\\/g, '/');
	}
	try {
		const result = await pool.query(
			`UPDATE brewcrafter.products SET
            category_id=$1, product_name=$2, product_description=$3, product_price=$4, image_url=$5,
            is_available=$6, is_popular=$7, ingredients=$8, updated_at=NOW()
            WHERE id=$9 RETURNING *`,
			[
				category_id,
				product_name,
				product_description,
				product_price,
				image_url,
				is_available,
				is_popular,
				ingredients ? JSON.parse(ingredients) : [],
				id,
			]
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ message: "Failed to update Product" });
	}
};


// Delete a product
exports.deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query("DELETE FROM brewcrafter.products WHERE id = $1", [id]);
		res.json({ message: "Product deleted" });
	} catch (err) {
		res.status(500).json({ message: "Failed to delete product" });
	}
};
