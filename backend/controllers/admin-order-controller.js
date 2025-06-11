const pool = require("../config/db-connection");

// Get all orders with customer and items
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch orders with user info
    const ordersRes = await pool.query(
      `SELECT o.*, u.user_name, u.user_email
       FROM brewcrafter.orders o
       JOIN brewcrafter.users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    const orders = ordersRes.rows;

    // Fetch items for each order
    for (const order of orders) {
      const itemsRes = await pool.query(
        `SELECT oi.*, 
                COALESCE(p.product_name, cd.name) AS item_name
         FROM brewcrafter.order_items oi
         LEFT JOIN brewcrafter.products p ON oi.product_id = p.id
         LEFT JOIN brewcrafter.custom_drinks cd ON oi.custom_drink_id = cd.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      order.items = itemsRes.rows;
    }

    res.json(orders);
  } catch (err) {
    console.error("Admin getAllOrders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};