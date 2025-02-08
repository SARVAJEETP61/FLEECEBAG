require("dotenv").config();

let express = require('express');
//let http = require ('http');
let { Server } = require('socket.io');
let path = require('path');
let { fileURLToPath } = require('url');
let client = require('./dbConnection.js');
let userrouter = require('./routers/userrouter');
let Offer = require('./controllers/offersController.js');


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
app.use('/api', cartPageRouter);

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



http.listen(port, () => {
    console.log('Express server started on port :' + port);
    // dbConnection();
    console.log('DB connection successful!');
});