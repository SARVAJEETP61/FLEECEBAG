let client = require('../dbConnection');
let collection = client.db('fleecebagDB').collection('Cart');

// Fetch Cart Items for a User
async function getCartItems(userData) {
    const query = { userId: userData.userId };
    try {
        return await collection.find(query).toArray();
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error("Error fetching cart items");
    }
}

// Remove or Update Cart Item
async function removeCartItem(userId, item_id) {
    try {
        // Fetch the cart for the user
        const cart = await collection.findOne({ userId });

        if (!cart || !cart.item || cart.item.length === 0) {
            throw new Error('Cart not found or no items in cart');
        }

        const itemIndex = cart.item.findIndex(item => item.item_id === item_id);

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        const item = cart.item[itemIndex];

        // If quantity > 1, decrease the quantity
        if (item.quantity > 1) {
            item.quantity -= 1;
            item.totalPrice = item.price * item.quantity;
        } else {
            cart.item.splice(itemIndex, 1);  // Remove item if quantity is 1
        }

        const totalPrice = cart.item.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shippingCharge = cart.item.length > 0 ? 10 : 0;

        // Update the cart in the database
        const result = await collection.updateOne(
            { userId },
            { $set: { item: cart.item, totalPrice, shippingCharge } }
        );

        // If cart is empty, reset totals
        if (cart.item.length === 0) {
            await collection.updateOne(
                { userId },
                { $set: { totalPrice: 0, totalShippingCharge: 0 } }
            );
        }

        return { success: true, message: 'Item removed or quantity updated successfully' };
    } catch (error) {
        console.error("Error removing item from cart:", error);
        throw new Error('Error removing item from cart');
    }
}

// Update Item Quantity
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

// Delete Cart by User ID
async function deleteCartByUserId(userId) {
    const query = { userId };
    try {
        return await collection.deleteOne(query);
    } catch (error) {
        console.error("Error deleting cart:", error);
        throw new Error('Error deleting cart');
    }
}

// Add Items to Cart
async function addCart(userId, items) {
    try {
        const existingCart = await collection.findOne({ userId });

        if (existingCart) {
            for (let newItem of items) {
                const existingItem = existingCart.item.find(
                    item => item.item_id === newItem.item_id
                );

                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                } else {
                    existingCart.item.push(newItem);
                }
            }

            await collection.updateOne({ userId }, { $set: { item: existingCart.item } });
            return { success: true, message: 'Cart updated successfully', cart: existingCart };
        } else {
            const newCart = { userId, item: items };
            await collection.insertOne(newCart);
            return { success: true, message: 'Cart created successfully', cart: newCart };
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return { success: false, message: 'Error updating cart' };
    }
}

module.exports = { getCartItems, removeCartItem, deleteCartByUserId, addCart, updateCartItemQuantity, collection };
