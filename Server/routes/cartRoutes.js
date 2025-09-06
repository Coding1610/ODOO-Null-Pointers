const express = require("express");
const router = express.Router();
const addToCart = require("../controllers/cartController");

// Add to cart route
router.post("/add", addToCart);

module.exports = router;
