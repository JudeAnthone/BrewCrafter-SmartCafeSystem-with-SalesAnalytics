
const pool = require("../config/db-connection");

// Save a custom drink to the database
exports.saveCustomDrink = async (req, res) => {
    try {
        const { user_id, base, size, milk, sweetener, toppings, extras, temperature, name, price } = req.body;

        const result = await pool.query(
            `INSERT INTO brewcrafter.custom_drinks (
                user_id, base, size, milk, sweetener, toppings, add_ins, temperature, name, price
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            ) RETURNING *`,
            [
                user_id,
                base,
                size,
                milk,
                sweetener,
                Array.isArray(toppings) ? toppings : [],
                Array.isArray(extras) ? extras : [],
                temperature,
                name,
                price,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error saving custom drink:", err);
        res.status(500).json({ error: "Failed to save custom drink" });
    }
};
