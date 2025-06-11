const pool = require("../config/db-connection");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         u.id, 
         u.user_name AS name, 
         u.user_email AS email, 
         u.user_phone AS phone, 
         u.created_at AS join_date, 
         u.last_login AS last_visit, 
         u.birthday, 
         u.address, 
         u.status, 
         u.profile_image,
         COALESCE(SUM(o.total_amount), 0) AS "totalSpent",
         COUNT(o.id) AS "orders",
         0 AS "loyaltyPoints"
       FROM brewcrafter.users u
       LEFT JOIN brewcrafter.orders o ON o.user_id = u.id AND o.status = 'completed'
       WHERE u.role_id = 2
       GROUP BY u.id
       ORDER BY u.created_at DESC`
    );

    // Add empty favorites and notes for compatibility
    const customers = result.rows.map(c => ({
      ...c,
      favorites: [],
      notes: ""
    }));

    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

// Get a single customer
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, user_name AS name, user_email AS email, user_phone AS phone, created_at AS join_date, 
              last_login AS last_visit, birthday, address, status, profile_image
         FROM brewcrafter.users
         WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Customer not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};

// Add a new customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone, birthday, address, status } = req.body;
    const result = await pool.query(
      `INSERT INTO brewcrafter.users 
        (id, user_name, user_email, user_phone, birthday, address, status, role_id, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 2, NOW())
       RETURNING id, user_name AS name, user_email AS email, user_phone AS phone, created_at AS join_date, 
                 last_login AS last_visit, birthday, address, status, profile_image`,
      [name, email, phone, birthday, address, status || 'Active']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add customer" });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, birthday, address, status } = req.body;
    const result = await pool.query(
      `UPDATE brewcrafter.users
         SET user_name = $1, user_email = $2, user_phone = $3, birthday = $4, address = $5, status = $6
       WHERE id = $7
       RETURNING id, user_name AS name, user_email AS email, user_phone AS phone, created_at AS join_date, 
                 last_login AS last_visit, birthday, address, status, profile_image`,
      [name, email, phone, birthday, address, status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Customer not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update customer" });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `DELETE FROM brewcrafter.users WHERE id = $1 AND role_id = 2`,
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};