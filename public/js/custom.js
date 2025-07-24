/**
 * Clientside helper functions
 */

// $(document).ready(function() {
//   var amounts = document.getElementsByClassName("amount");

//   // iterate through all "amount" elements and convert from cents to dollars
//   for (var i = 0; i < amounts.length; i++) {
//     amount = amounts[i].getAttribute('data-amount') / 100;  
//     amounts[i].innerHTML = amount.toFixed(2);
//   }
// })

// public/js/custom.js

document.addEventListener("DOMContentLoaded", async () => {
  // Only run on the checkout page
  const paymentForm = document.getElementById('payment-form');
  if (!paymentForm) return;

  // Get the Stripe publishable key from the hidden input field
  const stripePublishableKeyInput = document.getElementById('stripe-publishable-key');
  if (!stripePublishableKeyInput) return;
  const stripe = Stripe(stripePublishableKeyInput.value);
  let elements;

  const title = document.getElementById('item-title').value;
  const amount = document.getElementById('item-amount').value;
  const return_url = `${window.location.origin}/success?title=${encodeURIComponent(title)}&amount=${amount}`;

  const res = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, title })
  });
  const { clientSecret } = await res.json();

  const appearance = { /* appearance */ };
  const options = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    }
  };

  elements = stripe.elements({ clientSecret , appearance });
  const paymentElement = elements.create('payment', options);
  paymentElement.mount('#payment-element');

  paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = document.getElementById('submit');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    submitButton.disabled = true;
    buttonText.textContent = "Processing...";
    spinner.classList.remove('d-none');

    const email = document.getElementById('email').value;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
        return_url: return_url
      },
      redirect: "if_required"
    });

    if (error) {
      document.getElementById('payment-message').textContent = error.message;
      submitButton.disabled = false;
      buttonText.textContent = "Pay";
      spinner.classList.add('d-none');
    } else {
      const title = document.getElementById('item-title').value;
      const amount = document.getElementById('item-amount').value;
      window.location.href = `/success?title=${encodeURIComponent(title)}&amount=${amount}&payment_intent=${paymentIntent.id}`;
    }
  });
});

// Stripe Checkout Session handler for stripe-checkout.hbs
/* document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById('checkout-button');
  const stripePublishableKeyInput = document.getElementById('stripe-publishable-key');
  if (!checkoutButton || !stripeKeyInput) return;

  const stripe = Stripe(stripePublishableKeyInput.value);

  checkoutButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Get item info from hidden inputs
    const title = document.getElementById('item-title').value;
    const amount = document.getElementById('item-amount').value;
    const email = document.getElementById('email').value;

    fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount, email })
    })
      .then(res => res.json())
      .then(data => stripe.redirectToCheckout({ sessionId: data.id }));
  });
}); */