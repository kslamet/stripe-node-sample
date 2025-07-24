# Simple E-Commerce App

This is a simple e-commerce application that allows customers to purchase a book online. The project demonstrates a complete end-to-end purchase flow, including Stripe payment integration.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/)
- Stripe test account ([sign up here](https://dashboard.stripe.com/register))

### Installation

1. **Clone the repository and install dependencies:**
    ```sh
    git clone https://github.com/kslamet/stripe-node-sample.git
    cd stripe-node-sample
    npm install
    ```

2. **Set up environment variables:**
    - Rename `sample.env` to `.env`
    - Add your Stripe test API keys to `.env`

3. **Start the application:**
    ```sh
    npm start
    ```

4. **Open your browser and visit:** [http://localhost:3000](http://localhost:3000)

---

## How does the solution work

1. Select the item you wish to purchase
2. Enter payment details on the checkout page and click **Pay**
3. View the order confirmation page with your unique payment intent ID

---

## Features (which Stripe APIs?)

- Browse and select a book to purchase
- Secure embedded checkout with Stripe [Payment Element](https://docs.stripe.com/payments/payment-element) integration
- Upon successful checkout, display an order confirmation page with a unique [payment intent ID](https://docs.stripe.com/api/payment_intents)
- Responsive design using Bootstrap 4.6
- No database required—item selection is handled via URL parameters

---

## Application Architecture

- **Backend:** Node.js, [Express](https://expressjs.com/)
- **Frontend:** [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
- **Payments:** [Stripe](https://stripe.com/)
- **Templating:** Handlebars (hbs)

---

## Project Structure

```sh
.
├── app.js # Main application file
├── public/ # Static assets (CSS, JS, images)
├── views/ # Handlebars templates
├── sample.env # Example environment variables
└── README.md
```

---

## Additional improvements

- Handle [payment errors](https://docs.stripe.com/payments/payment-element#errors)
- Add a [currency selector](https://docs.stripe.com/elements/currency-selector-element) functionality, to show dynamic payment methods for different currencies
- To add [tax handling](https://docs.stripe.com/tax/payment-intent) functionality to simplify tax reporting for businesses
- To support [crypto payment](https://docs.stripe.com/crypto/accept-stablecoin-payments) (US only)
- To implement [Radar](https://docs.stripe.com/radar) for fraud protection

---

## License

MIT