
const orderNumber = localStorage.getItem("orderNumber");

// Select the element where the success message will be displayed
const successMessageContainer = document.querySelector(".success-message");

if (orderNumber) {
    successMessageContainer.innerHTML = `
        <h2>🎉 Thank You for Your Purchase!</h2>
        <p>Your order <strong>#${orderNumber}</strong> has been placed successfully.</p>
        <p>We will send you an email confirmation shortly.</p>
        <a href="index.html" class="continue-shopping-btn">Continue Shopping</a>
    `;
    
    // Remove order number after displaying it
    localStorage.removeItem("orderNumber");
} else {
    successMessageContainer.innerHTML = `
        <h2>⚠️ No Order Found</h2>
        <p>It looks like you haven't placed an order yet.</p>
        <a href="index.html" class="continue-shopping-btn">Go to Shop</a>
    `;
}

