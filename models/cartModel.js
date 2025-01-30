let client = require('../dbConnection');
let collection = client.db('fleecebagDB').collection('Cart');

async function getCartItems(userData) {
    const query = { userId: userData.userId };
    return await collection.find(query).toArray();
}

async function removeCartItem(userId, itemName) {
    const cart = await collection.findOne({ userId });

    if (!cart || !cart.item || cart.item.length === 0) {
        throw new Error('Cart not found or no items in cart');
    }

    const itemIndex = cart.item.findIndex(item => item.name === itemName);
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }

    const item = cart.item[itemIndex];

    if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
    } else {
        cart.item.splice(itemIndex, 1);
    }

    const totalPrice = cart.item.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingCharge = cart.item.length > 0 ? 10 : 0;

    return await collection.updateOne(
        { userId },
        { $set: { item: cart.item, totalPrice, shippingCharge } }
    );
}

async function deleteCartByUserId(userId) {
    const query = { userId };
    const result = await collection.deleteOne(query);
    return result;
}

async function addCart(userId, items) {
    try {
        const existingCart = await collection.findOne({ userId });

        if (existingCart) {
            for (let newItem of items) {
                const existingItem = existingCart.item.find(
                    item => item.name === newItem.name && item.color === newItem.color
                );

                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                    existingItem.totalPrice = existingItem.price * existingItem.quantity;
                    existingItem.totalShippingCharge = existingItem.shippingCharge * existingItem.quantity;
                } else {
                    existingCart.item.push({
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

async function updateCartItemQuantity(userId, itemName, quantity) {
    const cart = await collection.findOne({ userId });

    if (!cart || !cart.item || cart.item.length === 0) {
        throw new Error('Cart not found or no items in cart');
    }

    const itemIndex = cart.item.findIndex(item => item.name === itemName);
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }

    cart.item[itemIndex].quantity = quantity;
    cart.item[itemIndex].totalPrice = cart.item[itemIndex].price * quantity;

    const totalPrice = cart.item.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingCharge = cart.item.length > 0 ? 10 : 0;

    return await collection.updateOne(
        { userId },
        { $set: { item: cart.item, totalPrice, shippingCharge } }
    );
}

module.exports = { getCartItems, removeCartItem, collection, deleteCartByUserId, addCart, updateCartItemQuantity };
