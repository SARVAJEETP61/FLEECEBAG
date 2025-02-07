let cartModel = require('../models/cartModel');
const { addCart } = require('../models/cartModel');
const { collection } = require('../models/cartModel');

const getCartItemsApi = async (req, res) => {
    try {
        const userData = { userId: req.params.userId };
        let result = await cartModel.getCartItems(userData);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (err) {
        res.status(500).send();
    }
}

const deleteCartItemApi = async (req, res) => {
    const { userId, item_id } = req.body;

    try {
        const result = await cartModel.removeCartItem(userId, item_id);

        if (result.success) {
            res.status(200).json({ success: true, message: result.message });
        } else {
            res.status(404).json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing item from cart' });
    }
};

const removeAllCartItems = async (req, res) => {
    const userData = req.params.userId;

    try {
        const result = await cartModel.deleteCartByUserId(req.params.userId);

        if (result.deletedCount === 0) {
            return res.status(404).send();
        }

        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
};


async function handleAddToCart(req, res) {
    const { userId } = req.params;
    const { items } = req.body;
    try {
        const response = await addCart(userId, items);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error adding to cart' });
    }
}





const updateCartItemQuantity = async (req, res) => {
    const { userId, item_id, quantity } = req.body;

    try {
        // Use the native collection to find the cart
        const cart = await collection.findOne({ userId, 'item.item_id': item_id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // Update the item quantity directly
        const result = await collection.updateOne(
            { userId, 'item.item_id': item_id },
            { $set: { 'item.$.quantity': quantity } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: 'Failed to update item quantity' });
        }

        return res.status(200).json({ success: true, message: 'Item quantity updated successfully' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ success: false, message: 'Error updating item quantity' });
    }
};





module.exports = { getCartItemsApi, deleteCartItemApi, removeAllCartItems, updateCartItemQuantity, handleAddToCart, collection };
