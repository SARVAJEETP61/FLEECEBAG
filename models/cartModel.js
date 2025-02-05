let client = require('../dbConnection');
let collection = client.db('fleecebagDB').collection('Cart');

async function getCartItems(userData) {
    const query = { userId: userData.userId };
    return await collection.find(query).toArray();
}

async function removeCartItem(userId, item_id) {
    try {
        console.log(`Fetching cart for user: ${userId}`);

        // Fetch the cart for the user
        const cart = await collection.findOne({ userId });
        console.log('Cart found:', cart);

        if (!cart || !cart.item || cart.item.length === 0) {
            throw new Error('Cart not found or no items in cart');
        }

        // Find the item in the cart
        const itemIndex = cart.item.findIndex(item => item.item_id === item_id);
        console.log('Item Index:', itemIndex);

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        const item = cart.item[itemIndex];
        console.log('Item found:', item);

        // If quantity > 1, decrease the quantity by 1
        if (item.quantity > 1) {
            console.log('Decreasing quantity of item');
            item.quantity -= 1;
            item.totalPrice = item.price * item.quantity;  // Update total price for the item
        } else {
            console.log('Removing item from cart');
            // If quantity is 1, remove the item from the cart
            cart.item.splice(itemIndex, 1);
        }

        // Recalculate the total price and shipping charge
        const totalPrice = cart.item.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shippingCharge = cart.item.length > 0 ? 10 : 0;  // Apply shipping charge if there are items left
        console.log('Total Price:', totalPrice, 'Shipping Charge:', shippingCharge);

        // Update the cart in the database
        const result = await collection.updateOne(
            { userId },
            { $set: { item: cart.item, totalPrice, shippingCharge } }
        );
        console.log('Cart updated:', result);

        // If the cart is empty, reset the total price and shipping charge to 0
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

async function updateCartItemQuantity(userId, item_id, quantity) {
    try {
        const cart = await collection.findOne({ userId });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const itemIdNumber = Number(item_id);
        const itemIndex = cart.item.findIndex(item => item.item_id === itemIdNumber);
        if (itemIndex === -1) {
            throw new Error('Item not found');
        }

        cart.item[itemIndex].quantity = quantity;
        cart.item[itemIndex].totalPrice = cart.item[itemIndex].price * quantity;

        const totalPrice = cart.item.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shippingCharge = cart.item.length > 0 ? 10 : 0;

        await collection.updateOne(
            { userId },
            { $set: { item: cart.item, totalPrice, shippingCharge } }
        );

        return { success: true, message: 'Item quantity updated successfully' };
    } catch (error) {
        throw new Error(error.message || 'Error updating cart item');
    }
}

async function deleteCartByUserId(userId) {
    const query = { userId };
    const result = await collection.deleteOne(query);
    return result;
}

async function addCart(userId, items) {
    try {
        // Check if items is an array and not empty
        if (!Array.isArray(items) || items.length === 0) {
            console.error('Invalid or empty items array:', items);
            return { success: false, message: 'Invalid items array' };
        }

        const existingCart = await collection.findOne({ userId });

        if (existingCart) {
            for (let newItem of items) {
                const existingItem = existingCart.item.find(
                    item => item.item_id === newItem.item_id
                );

                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                    existingItem.totalPrice = existingItem.price * existingItem.quantity;
                    existingItem.totalShippingCharge = existingItem.shippingCharge * existingItem.quantity;
                } else {
                    existingCart.item.push({
                        item_id: newItem.id,
                        name: newItem.name,
                        price: newItem.price,
                        quantity: newItem.quantity,
                        color: newItem.color,
                        image: newItem.image,
                        discountedPrice: newItem.discountedPrice,
                        shippingCharge: newItem.shippingCharge
                    });
                }

                existingCart.totalPrice += newItem.price * newItem.quantity;
                existingCart.totalShippingCharge += newItem.shippingCharge * newItem.quantity;
            }

            existingCart.item.forEach(item => {
                delete item.totalPrice;
                delete item.totalShippingCharge;
            });

            await collection.updateOne(
                { userId },
                {
                    $set: {
                        item: existingCart.item,
                        totalPrice: existingCart.totalPrice,
                        totalShippingCharge: existingCart.totalShippingCharge
                    }
                }
            );

            return { success: true, message: 'Cart updated successfully', cart: existingCart };
        } else {
            let totalPrice = 0;
            let totalShippingCharge = 0;

            const newItems = items.map(item => {
                totalPrice += item.price * item.quantity;
                totalShippingCharge += item.shippingCharge * item.quantity;

                return {
                    item_id: item.item_id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                    image: item.image,
                    discountedPrice: item.discountedPrice,
                    shippingCharge: item.shippingCharge
                };
            });

            const newCart = {
                userId: userId,
                item: newItems,
                totalPrice: totalPrice,
                totalShippingCharge: totalShippingCharge
            };

            await collection.insertOne(newCart);

            return { success: true, message: 'Cart created successfully', cart: newCart };
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return { success: false, message: 'Error updating cart' };
    }
}




module.exports = { getCartItems, removeCartItem, collection, deleteCartByUserId, addCart, updateCartItemQuantity };
