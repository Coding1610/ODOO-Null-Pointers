const Product = require("../models/Product");
const Cart = require("../models/cart");

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user's cart or create a new one
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // If product exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Else, push new product
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    return res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = addToCart;
