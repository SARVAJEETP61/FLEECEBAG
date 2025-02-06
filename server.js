require("dotenv").config();

let express = require('express');
//let http = require ('http');
let { Server } = require('socket.io');
let path = require('path');
let { fileURLToPath } = require('url');
let client = require('./dbConnection.js');
let userrouter = require('./routers/userrouter');
let Offer = require('./controllers/offersController.js');
const Cart = require('./models/cart'); // Adjust the path if necessary


const { collection } = require('./models/cartModel');
const app = express();
const cors = require('cors');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());


const port = 8080;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/img', express.static(path.join(__dirname, 'img')));


// Dynamic route to serve HTML files in the subpages folder

app.get('/subpages/:folder/:file.html', (req, res) => {
    const { folder, file } = req.params;
    const filePath = path.join(__dirname, 'subpages', folder, `${file}.html`);
    res.sendFile(filePath);
});


app.get('/:page.html', (req, res) => {
    const { page } = req.params;
    const filePath = path.join(__dirname, `${page}.html`);
    res.sendFile(filePath);
});

let router = require('./routers/router.js');
let menRouter = require('./routers/menPageRouter');
let womenRouter = require('./routers/womenPageRouter');
let otherPageRouter = require('./routers/otherPageRouter.js');
let orderPageRouter = require('./routers/orderPageRouter.js');
let cartPageRouter = require('./routers/cartPageRouter');

const http = require('http').Server(app);

// var port = 8080;
require('./dbConnection');

app.use('/', router);

app.use(menRouter);
app.use(userrouter);
app.use(womenRouter);
app.use('/', otherPageRouter);
app.use('/', orderPageRouter);
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
app.use('/partials', express.static(path.join(__dirname, 'partials')));
app.use('/subpages', express.static(path.join(__dirname, 'subpages')));
app.use(cartPageRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));


// app.get('/itemOther', async (req, res) => {
//     try {
//         const items = await ItemOther.find(); // Fetch all items from MongoDB

//         // If no items are found, handle it gracefully
//         if (!items || items.length === 0) {
//             return res.status(404).json({ statusCode: 404, message: 'No items found' });
//         }

//         res.json({
//             statusCode: 200,
//             data: items
//         });
//     } catch (error) {
//         // Log the error for debugging
//         console.error('Error fetching items:', error);

//         // Respond with an error message
//         res.status(500).json({
//             statusCode: 500,
//             message: 'Internal Server Error: ' + error.message
//         });
//     }
// });

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            throw new Error("Amount is required");
        }

        console.log("Received payment request for amount:", amount);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: { name: "Total Order" },
                    unit_amount: Math.round(amount * 100), // Convert to cents
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: "http://localhost:8080/success.html",
            cancel_url: "http://localhost:8080/cancel.html",
        });

        console.log("Stripe session created:", session.id);
        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
    }
});


// API endpoint to add to cart
app.post('/api/cart', async (req, res) => {
    const { userId, item_id, name, type, discount, price, discountedPrice, isNew, isInOffer, isItBestDeal, image } = req.body;

    try {
        await client.connect();  // Connect to MongoDB
        const collection = client.db('fleecebagDB').collection('Cart'); // Access collection

        // Product data to be added to cart
        const product = {
            item_id,
            name,
            type,
            discount,
            price,
            discountedPrice,
            isNew,
            isInOffer,
            isItBestDeal,
            image
        };

        // Add product to cart with $addToSet
        const result = await collection.updateOne(
            { userId: userId }, // Find the user's cart
            { $addToSet: { item: product } }, // Add product to items array
            { upsert: true } // Create cart if not found
        );

        console.log('Product added to cart:', result);
        res.status(200).json({ message: 'Product added to cart successfully!', result });

    } catch (error) {
        console.error('Error adding product to cart:', error.message);
        res.status(400).json({ error: 'Failed to add to cart', details: error.message });
    } finally {
        await client.close();  // Close connection after operation
    }
});

http.listen(port, () => {
    console.log('Express server started on port :' + port);
    //dbConnection();
    //console.log('DB connection successful!');
});