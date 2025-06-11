// All the routing must be in the main/server file. 
require("dotenv").config();
const express = require("express"); // express framework
const cors = require("cors"); // cors import
const pool = require("./config/db-connection") // PgSQL connection 
const authRoutes = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin-routes');
const productRoutes = require('./routes/product-routes');
const customDrinkRoutes = require('./routes/custom-drink-routes');
const cartRoutes = require('./routes/cart-routes');
const orderRoutes = require('./routes/order-routes');
const orderHistoryRoutes = require('./routes/order-history-routes');
const passport = require('./config/facebook-auth'); // fb auth
const path = require('path'); // multer
const adminOrderRoutes = require('./routes/admin-order-routes'); // admin-order
const inventoryRoutes = require('./routes/inventory-routes'); // admin-inventory
const dashboardRoutes = require('./routes/dashboard-routes'); // main dashboard
const customerRoutes = require('./routes/customer-routes'); // customer-routes
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
 
// // Facebook auth - cancelled plan app.use(passport.initialize()); // FB passport

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // admin routes
app.use('/api/products', productRoutes); // product routes
app.use('/api/custom-drinks', customDrinkRoutes); // custom drink routes
app.use('/api/cart', cartRoutes); // cart routes
app.use('/api/orders', orderRoutes); // order routes
app.use('/api/order-history', orderHistoryRoutes); // order history routes
app.use('/api/admin', adminOrderRoutes);  
app.use('/api/admin/inventory', inventoryRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/customers', customerRoutes);
app.use('/api/admin', adminRoutes); // admin routes
app.use('/api/admin', adminOrderRoutes); 

// product image (multer)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/products', express.static(path.join(__dirname, '../uploads/products')));



// Route - backend server message
app.get("/", (req, res) => {
  res.send("BrewCrafter Backend is Running!")
});

// Start Server - backend running port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

