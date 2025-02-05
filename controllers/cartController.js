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

    const itemIdNumber = Number(item_id);

    if (isNaN(itemIdNumber)) {
        return res.status(400).json({ success: false, message: 'Invalid item_id' });
    }

    try {
        const cart = await collection.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.item.findIndex(item => item.item_id === itemIdNumber);

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        cart.item.splice(itemIndex, 1);

        await collection.updateOne({ userId }, { $set: { item: cart.item } });

        res.status(200).json({ success: true, message: 'Item removed successfully' });
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

async function createCart(req, res) {
    const userId = req.params.userId;
    const items = req.body.item;

    // Log the received items to debug
    console.log('Received items:', items);

    // Check if the items array is not empty and if the item_id exists in each item
    if (!items || items.length === 0 || !items[0].item_id) {
        console.error('Item or item_id is missing in the request.');
        return res.status(400).json({
            message: 'item_id is required',
        });
    }

    try {
        // Call addCart function with userId and items
        const result = await addCart(userId, items);

        if (result.success) {
            res.status(200).json({
                message: result.message,
                cart: result.cart,
            });
        } else {
            res.status(500).json({
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Error while creating cart:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}


const updateCartItemApi = async (req, res, userId, item_id, quantity) => {
    const itemIdNumber = Number(item_id);

    if (isNaN(itemIdNumber)) {
        return res.status(400).json({ success: false, message: 'Invalid item_id' });
    }

    try {
        await cartModel.updateCartItemQuantity(userId, itemIdNumber, quantity);

        res.status(200).json({ success: true, message: 'Item quantity updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating item quantity' });
    }
};

module.exports = { getCartItemsApi, deleteCartItemApi, removeAllCartItems, createCart, updateCartItemApi };
