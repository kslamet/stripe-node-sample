const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var app = express();

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    divide: function(a, b) {
      // Ensure both are numbers and format to 2 decimal places
      return (Number(a) / Number(b)).toFixed(2);
    }
  }
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({}));

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800  
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }

  res.render('checkout', {
    title: title,
    amount: amount,
    error: error,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

// Create PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  const { amount, title } = req.body;
  if (!amount) {
    return res.status(400).json({ error: 'Missing amount' });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount, 10), // amount in cents
      currency: 'sgd',
      description: title,
      automatic_payment_methods: { enabled: true }, // <-- important for Payment Element
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// To use Stripe Checkout session, rename stripe-checkout.hbs to checkout.hbs and uncomment the code below
/* app.post('/create-checkout-session', async (req, res) => {
  console.log("starting stripe session");
  const { title, amount } = req.body;
  console.log("req.body: ", req.body);
  console.log("title: ", title);
  console.log("amount: ", amount);
  const amountInt = parseInt(amount, 10);
  console.log("amountInt: ", amountInt);

  if (!title || !amount) {
    return res.status(400).json({ error: 'Missing item info' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
   line_items: [
      {
        price_data: {
          currency: 'sgd',
          product_data: { name: title },
          unit_amount: amountInt, // amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.origin}/success?title=${encodeURIComponent(title)}&amount=${amount}`,
    cancel_url: `${req.headers.origin}/checkout`,
  });
  res.json({ id: session.id });
}); */

/**
 * Success route
 */
app.get('/success', function(req, res) {
  const { title, amount, payment_intent } = req.query;
  res.render('success', { title, amount, payment_intent });
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
