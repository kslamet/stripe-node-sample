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
    git clone https://github.com/kslamet/sa-takehome-project-node
    cd sa-takehome-project-node
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

## How to approach adding payments on your e-commerce page

- This project is cloned from [here](https://github.com/mattmitchell6/sa-takehome-project-node) 
- The sample code is meant for demonstration purposes and does not include persistent storage.
- All payment processing is done in Stripe test mode—no real charges will be made.
- Specific documents that need to be modified are the backend **app.js** file, adding the Payment Element in **checkout.hbs** view, adding payment controls on the frontend **custom.js** file, and showing Payment Intent ID on **success.hbs** view.
- To get familiarized with Stripe Payments and Elements, refer to the following documentations:
    - [Embedded Payments Quickstart](https://docs.stripe.com/payments/quickstart)
    - [PaymentIntent vs SetupIntent](https://docs.stripe.com/payments/payment-element/design-an-integration)
    - [Payment Element UI Component](https://docs.stripe.com/payments/payment-element)
    - [Payment Element Best Practices](https://docs.stripe.com/payments/payment-element/best-practices)
    - [Payment Intents API Specifications](https://docs.stripe.com/api/payment_intents/create)

---

## Challenges you might encounter

- There are multiple approaches to set up payments on Stripe. In this example, we are focusing on using Stripe Payment Elements and PaymentIntent API.
- For client side, it is helpful to review console logs on your browser (F12) to see specific errors you are facing. Common errors include:
    - Uncaught promise errors - often due to variables being used outside the scope where it is declared
    - Page redirect issues - decide whether to use Stripe return_url parameter in confirmParams, vs handling it yourself
    - Ensure custom.js is included in your layout
- For server side, it is helpful to review error codes in the terminal. Common errors include:
    - As Stripe processes currency in cents, it is important to ensure formatting is handled correctly
    - Refer to best practices when [creating PaymentIntent](https://docs.stripe.com/payments/payment-intents#creating-a-paymentintent)
- Do look out for exposed API keys in parts of the sample code. It is best to keep them inside your environment variables and make references to the variables.

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