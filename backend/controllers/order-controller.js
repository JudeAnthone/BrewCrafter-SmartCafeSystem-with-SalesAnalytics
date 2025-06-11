//Place order API endpoint
const pool = require("../config/db-connection");

// Place an order for the current user's cart
exports.placeOrder = async (req, res) => {
    try {
        const { user_id } = req.body;
        // Get all cart items for the user
        const cartRes = await pool.query(
            `SELECT * FROM brewcrafter.cart_items WHERE user_id = $1`,
            [user_id]
        );
        const cartItems = cartRes.rows;
        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Helper to get price if missing
        const getUnitPrice = async (item) => {
            if (item.price) return Number(item.price);
            if (item.product_price) return Number(item.product_price);
            if (item.product_id) {
                const prodRes = await pool.query(
                    'SELECT product_price FROM brewcrafter.products WHERE id = $1',
                    [item.product_id]
                );
                return prodRes.rows[0]?.product_price ? Number(prodRes.rows[0].product_price) : 0;
            }
            if (item.custom_drink_id) {
                const cdRes = await pool.query(
                    'SELECT price FROM brewcrafter.custom_drinks WHERE id = $1',
                    [item.custom_drink_id]
                );
                return cdRes.rows[0]?.price ? Number(cdRes.rows[0].price) : 0;
            }
            return 0;
        };

        // Calculate total amount
        let totalAmount = 0;
        for (const item of cartItems) {
            const unitPrice = await getUnitPrice(item);
            totalAmount += unitPrice * item.quantity;
        }

        // Create order
        const orderRes = await pool.query(
            `INSERT INTO brewcrafter.orders (user_id, status, total_amount, created_at)
             VALUES ($1, 'completed', $2, NOW()) RETURNING *`,
            [user_id, totalAmount]
        );
        const order = orderRes.rows[0];

        // Insert order items
        for (const item of cartItems) {
            const unitPrice = await getUnitPrice(item);
            const subtotal = unitPrice * item.quantity;
            await pool.query(
                `INSERT INTO brewcrafter.order_items
                 (order_id, product_id, custom_drink_id, quantity, unit_price, subtotal, notes, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
                [
                    order.id,
                    item.product_id,
                    item.custom_drink_id,
                    item.quantity,
                    unitPrice,
                    subtotal,
                    item.notes
                ]
            );
        }

        // Clear the user's cart
        await pool.query(
            `DELETE FROM brewcrafter.cart_items WHERE user_id = $1`,
            [user_id]
        );

        res.json({ success: true, order_id: order.id });
    } catch (err) {
        console.error("Order placement error:", err);
        res.status(500).json({ error: "Failed to place order" });
    }
};