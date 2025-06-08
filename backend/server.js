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
const passport = require('./config/facebook-auth');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
 
app.use(passport.initialize()); // FB passport

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // admin routes
app.use('/api/products', productRoutes); // product routes
app.use('/api/custom-drinks', customDrinkRoutes); // custom drink routes
app.use('/api/cart', cartRoutes); // cart routes

// Serve product images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/products', express.static(path.join(__dirname, '../uploads/products')));



// Route
app.get("/", (req, res) => {
  res.send("BrewCrafter Backend is Running!")
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

