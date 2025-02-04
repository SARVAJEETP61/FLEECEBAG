let cartModel = require('../models/cartModel');
const { addCart } = require('../models/cartModel');

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
    const { userId, itemName } = req.body;

    try {
        await cartModel.removeCartItem(userId, itemName);
        res.status(204).send();
    } catch (error) {
        res.status(500).send();
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

    try {
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
        console.error('Error in createCart controller:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}

module.exports = { getCartItemsApi, deleteCartItemApi, removeAllCartItems, createCart };
