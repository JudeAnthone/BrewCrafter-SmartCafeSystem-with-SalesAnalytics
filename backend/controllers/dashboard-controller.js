const pool = require("../config/db-connection");

const getToday = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000;
  const localISO = new Date(today.getTime() - offset).toISOString().slice(0, 10);
  return localISO;
};

// 1. Today's Sales
exports.getTodaySales = async (req, res) => {
  try {
    const today = getToday();
    const result = await pool.query(
      `SELECT COALESCE(SUM(total_amount),0) AS total
       FROM brewcrafter.orders
       WHERE status = 'completed' AND DATE(created_at) = $1`,
      [today]
    );
    res.json({ totalSales: Number(result.rows[0].total) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today's sales" });
  }
};

// 2. Orders Summary (today)
exports.getOrdersSummary = async (req, res) => {
  try {
    const today = getToday();
    const result = await pool.query(
      `SELECT
         COUNT(*) AS total,
         COUNT(*) FILTER (WHERE status = 'pending') AS pending,
         COUNT(*) FILTER (WHERE status = 'preparing') AS preparing,
         COUNT(*) FILTER (WHERE status = 'completed') AS completed,
         COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled
       FROM brewcrafter.orders
       WHERE DATE(created_at) = $1`,
      [today]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders summary" });
  }
};

// 3. Custom Drinks (today)
exports.getCustomDrinksCount = async (req, res) => {
  try {
    const today = getToday();
    const result = await pool.query(
      `SELECT COUNT(*) AS count
       FROM brewcrafter.order_items
       WHERE custom_drink_id IS NOT NULL
         AND DATE(created_at) = $1`,
      [today]
    );
    res.json({ count: Number(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch custom drinks count" });
  }
};

// 4. Inventory Status
exports.getInventoryStatus = async (req, res) => {
  try {
    const lowStock = await pool.query(
      `SELECT COUNT(*) AS low
       FROM brewcrafter.inventory
       WHERE quantity <= min_level AND quantity > 0`
    );
    const outOfStock = await pool.query(
      `SELECT COUNT(*) AS out
       FROM brewcrafter.inventory
       WHERE quantity = 0`
    );
    res.json({
      low: Number(lowStock.rows[0].low),
      out: Number(outOfStock.rows[0].out)
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventory status" });
  }
};

// 5. Sales Chart (last 7 days)
exports.getSalesChart = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT TO_CHAR(created_at, 'Dy') AS name, SUM(total_amount) AS sales
       FROM brewcrafter.orders
       WHERE status = 'completed'
         AND created_at >= NOW() - INTERVAL '6 days'
       GROUP BY name, DATE(created_at)
       ORDER BY DATE(created_at)`
    );
    // Fill missing days with 0 sales
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const todayIdx = new Date().getDay();
    const chart = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const name = days[d.getDay()];
      const found = result.rows.find(r => r.name === name);
      chart.push({ name, sales: found ? Number(found.sales) : 0 });
    }
    res.json(chart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales chart" });
  }
};

// 6. Recent Orders (last 5)
exports.getRecentOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id, u.user_name, o.total_amount, o.status, o.created_at
       FROM brewcrafter.orders o
       JOIN brewcrafter.users u ON o.user_id = u.id
       ORDER BY o.created_at DESC
       LIMIT 5`
    );
    // Get items for each order
    for (const order of result.rows) {
      const itemsRes = await pool.query(
        `SELECT COALESCE(p.product_name, cd.name) AS item_name
         FROM brewcrafter.order_items oi
         LEFT JOIN brewcrafter.products p ON oi.product_id = p.id
         LEFT JOIN brewcrafter.custom_drinks cd ON oi.custom_drink_id = cd.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      order.items = itemsRes.rows.map(i => i.item_name).join(', ');
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recent orders" });
  }
};

// 7. Popular Items (top 5 this week)
exports.getPopularItems = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         COALESCE(p.product_name, cd.name) AS name,
         SUM(oi.quantity) AS orders,
         COALESCE(p.product_price, cd.price) AS price
       FROM brewcrafter.order_items oi
       LEFT JOIN brewcrafter.products p ON oi.product_id = p.id
       LEFT JOIN brewcrafter.custom_drinks cd ON oi.custom_drink_id = cd.id
       WHERE oi.created_at >= NOW() - INTERVAL '7 days'
       GROUP BY p.product_name, cd.name, p.product_price, cd.price
       ORDER BY orders DESC
       LIMIT 5`
    );
    res.json(Array.isArray(result.rows) ? result.rows : []);
  } catch (err) {
    console.error("Popular Items Error:", err);
    res.status(500).json({ error: "Failed to fetch popular items" });
  }
};