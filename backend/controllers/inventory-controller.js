const pool = require("../config/db-connection");

// Get all inventory items
exports.getAllInventory = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, c.category_name
       FROM brewcrafter.inventory i
       LEFT JOIN brewcrafter.categories c ON i.category_id = c.id
       ORDER BY i.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get inventory error:", err);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
};

// Add new inventory item
exports.addInventory = async (req, res) => {
  try {
    const {
      name, quantity, unit, min_level, price_per_unit, category_id,
      status, last_restocked, location, expiry_date
    } = req.body;
    const result = await pool.query(
      `INSERT INTO brewcrafter.inventory
        (name, quantity, unit, min_level, price_per_unit, category_id, status, last_restocked, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING *`,
      [name, quantity, unit, min_level, price_per_unit, category_id, status || 'In Stock', last_restocked]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Add inventory error:", err);
    res.status(500).json({ error: "Failed to add inventory item" });
  }
};

// Update inventory item
exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, quantity, unit, min_level, price_per_unit, category_id,
      status, last_restocked, location, expiry_date
    } = req.body;
    const result = await pool.query(
      `UPDATE brewcrafter.inventory
       SET name=$1, quantity=$2, unit=$3, min_level=$4, price_per_unit=$5, category_id=$6,
           status=$7, last_restocked=$8, updated_at=NOW()
       WHERE id=$9 RETURNING *`,
      [name, quantity, unit, min_level, price_per_unit, category_id, status, last_restocked, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Update inventory error:", err);
    res.status(500).json({ error: "Failed to update inventory item" });
  }
};

// Delete inventory item
exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM brewcrafter.inventory WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete inventory error:", err);
    res.status(500).json({ error: "Failed to delete inventory item" });
  }
};