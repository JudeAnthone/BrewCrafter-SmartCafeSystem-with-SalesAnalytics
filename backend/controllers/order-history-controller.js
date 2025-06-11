const pool = require("../config/db-connection");

// Get all orders for a user, including items
exports.getUserOrderHistory = async (req, res) => {
    try {
        const { user_id } = req.query;
        // Get all orders for the user
        const ordersRes = await pool.query(
            `SELECT * FROM brewcrafter.orders WHERE user_id = $1 ORDER BY created_at DESC`,
            [user_id]
        );
        const orders = ordersRes.rows;

        // For each order, get its items
        for (const order of orders) {
            const itemsRes = await pool.query(
                `SELECT oi.*, 
                        p.product_name, p.image_url AS product_image, 
                        cd.name AS custom_drink_name, cd.image_url AS custom_drink_image
                 FROM brewcrafter.order_items oi
                 LEFT JOIN brewcrafter.products p ON oi.product_id = p.id
                 LEFT JOIN brewcrafter.custom_drinks cd ON oi.custom_drink_id = cd.id
                 WHERE oi.order_id = $1`,
                [order.id]
            );
            order.items = itemsRes.rows.map(item => ({
                ...item,
                image_url: item.product_image || item.custom_drink_image || null,
                name: item.product_name || item.custom_drink_name || "Custom Drink"
            }));
        }

        res.json(orders);
    } catch (err) {
        console.error("Order history fetch error:", err);
        res.status(500).json({ error: "Failed to fetch order history" });
    }
};