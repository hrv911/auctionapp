/**
 * Model imports.
 */
const Product = require("../models/product.model");

// Note: This middleware is for user router. Not to be used in product router.
const isTimeRemaining = async (req, res, next) => {
    
    // 1. Get product id.
    const { productId } = req.params;

    // 2. Get product data.
    const product = await Product.findById(productId);

    // 3. Get current time, startTime and endTime of the auction.
    const today = new Date();
    const startTime = product.startTime;
    const endTime = new Date(product.endTime);

    // 4. If today is within the range of startTime and endTime, then allow to bid.
    if (startTime <= today && endTime >= today) {
        return next();
    } else {
        req.flash('error', 'Auction is not running.');
        return res.redirect(`/products/${productId}`);
    }
}

module.exports = isTimeRemaining;