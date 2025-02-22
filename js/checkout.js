
const checkoutItem = JSON.parse(localStorage.getItem("checkoutItem")) || null;
const checkoutContainer = document.querySelector(".checkout-item-container")

let checkoutPageData = async () => {
    // Ensure checkoutItem exists before proceeding
    if (!checkoutItem) {
        console.error("No checkout item found.");
        return;
    }

    checkoutContainer.innerHTML = '';

    try{
    let response = await fetch(`https://v2.api.noroff.dev/rainy-days/${checkoutItem.id}`)
    let finalItems = await response.json();

    let product = finalItems.data;
    let productPrice = product.onSale ? product.discountedPrice : product.price;

    displayCheckoutData(product, checkoutItem.quantity, productPrice);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

let displayCheckoutData= (product, quantity) =>{
    checkoutContainer.innerHTML=`
     <div class="checkout-item">
            <img src="${product.image.url}" alt="${product.image.alt}"class="checkout-item-image">
            <div class="item-number">${quantity}</div>
        <p class="item-description">${product.title}</p>
       </div>
        <div class="checkout-summary">
            <p><span>Subtotal</span><span class="price">NOK ${(product.price*quantity).toFixed(2)}</span></p>
            <p><span>Shipping</span><span class="free">FREE</span></p><hr>
            <p><span>Total</span><span class="total">NOK ${(product.price*quantity).toFixed(2)}</span></p>
        </div> `
}

checkoutPageData()

