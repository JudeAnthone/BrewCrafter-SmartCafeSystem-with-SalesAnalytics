const pool = require("../config/db-connection");

// Get all cart items for a user
exports.getCart = async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await pool.query(
      `SELECT 
          ci.*,
          CASE 
            WHEN ci.product_id IS NOT NULL THEN p.product_price
            ELSE cd.price
          END as price,
          CASE 
            WHEN ci.product_id IS NOT NULL THEN p.product_name
            ELSE cd.name
          END as name,
          CASE 
            WHEN ci.product_id IS NOT NULL THEN p.image_url
            ELSE cd.image_url
          END as image_url,
          cd.base, cd.size, cd.milk, cd.sweetener, 
          cd.toppings, cd.add_ins, cd.temperature,
          p.product_name, p.product_price, p.image_url as product_image
       FROM brewcrafter.cart_items ci
       LEFT JOIN brewcrafter.custom_drinks cd ON ci.custom_drink_id = cd.id
       LEFT JOIN brewcrafter.products p ON ci.product_id = p.id
       WHERE ci.user_id = $1
       ORDER BY ci.created_at DESC`,
      [user_id]
    );

     
    const cartItems = result.rows.map(item => {
    
      if (
        item.product_id &&
        item.image_url &&
        !item.image_url.startsWith("http")
      ) {
        item.image_url = `${req.protocol}://${req.get("host")}/${item.image_url.replace(/\\/g, "/")}`;
      }
      return item;
    });

    res.json(cartItems);
  } catch (err) {
    console.error('Cart fetch error:', err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Add item to cart (product or custom drink)
exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, custom_drink_id, quantity, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO brewcrafter.cart_items
        (user_id, product_id, custom_drink_id, quantity, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, product_id || null, custom_drink_id || null, quantity, notes || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};


// Update quantity or notes
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, notes } = req.body;
    const result = await pool.query(
      `UPDATE brewcrafter.cart_items
       SET quantity = $1, notes = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [quantity, notes || null, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
};


// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `DELETE FROM brewcrafter.cart_items WHERE id = $1`,
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove cart item" });
  }
};


exports.clearCart = async (req, res) => {
  try {
    const user_id = req.query.user_id; 
    await pool.query(
      'DELETE FROM brewcrafter.cart_items WHERE user_id = $1',
      [user_id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};