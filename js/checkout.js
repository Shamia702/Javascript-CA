


// const checkoutProcess = async()=>{
//     const checkoutContainer = document.querySelector(".checkout-item-container");
//     const checkoutSummary = document.querySelector(".checkout-summary");
//     const checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];


//     if (!checkoutCart.length) {
//         checkoutContainer.innerHTML = "<p>No items in checkout.</p>";
//         checkoutSummary.innerHTML = ""; 
//         return;
//     }

//     checkoutContainer.innerHTML = ""; 
//     let totalPrice = 0;
    

//     for (const item of checkoutCart) {
//         try {
//             let response = await fetch(`https://v2.api.noroff.dev/rainy-days/${item.id}`);
//             let productData = await response.json();
//             let product = productData.data;

//             let productPrice = product.onSale ? product.discountedPrice : product.price;
//             let subtotal = (productPrice * item.item).toFixed(2);
//             totalPrice += parseFloat(subtotal);

           
//             checkoutContainer.innerHTML += `
//                 <div class="checkout-item">
//                     <img src="${product.image.url}" alt="${product.title}" class="checkout-item-image">
//                     <p class="item-description">
//                         ${product.title} <span class="multiply-sign">× ${item.item}</span>
//                     </p>
//                     <p class="price">NOK ${subtotal}</p>
//                 </div>
//             `;

//         } catch (error) {
//             console.error("Error fetching product details:", error);
//         }
//     }

  
//     checkoutSummary.innerHTML = `
//         <p><span>Subtotal</span><span class="price">NOK ${totalPrice.toFixed(2)}</span></p>
//         <p><span>Shipping</span><span class="free">FREE</span></p><hr>
//         <p><span>Total</span><span class="total">NOK ${totalPrice.toFixed(2)}</span></p>
//         <a href="success.html" class="complete-order-btn" id="complete-order-btn">Complete Order</a`;


//     const completeOrderBtn = document.getElementById("complete-order-btn");
// if (completeOrderBtn) {
//     completeOrderBtn.addEventListener("click", (e) => {
//         e.preventDefault(); 
//         const orderNumber = "RD" + Math.floor(100000 + Math.random() * 900000);
//     localStorage.setItem("orderNumber", orderNumber); 

        
//             localStorage.removeItem("checkoutCart"); 
//             localStorage.removeItem("data");
//             window.location.href = "success.html";

//     });
// };
// };

// checkoutProcess();


const checkoutProcess = async () => {
    const loader = document.getElementById("loader");
    loader.style.display = "flex"; 
    const checkoutContainer = document.querySelector(".checkout-item-container");
    const checkoutSummary = document.querySelector(".checkout-summary");

    const checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    const buyNowItem = JSON.parse(localStorage.getItem("checkoutItem"));

    let itemsToCheckout = [];


    if (buyNowItem && buyNowItem.id && buyNowItem.item) {
        itemsToCheckout = [{ id: buyNowItem.id, item: buyNowItem.item }];
        localStorage.removeItem("checkoutItem"); 
    } else {
        itemsToCheckout = checkoutCart;
    }

    if (!itemsToCheckout.length) {
        checkoutContainer.innerHTML = "<p>No items in checkout.</p>";
        checkoutSummary.innerHTML = "";
        return;
    }

    checkoutContainer.innerHTML = "";
    let totalPrice = 0;

    for (const item of itemsToCheckout) {
        try {
            let response = await fetch(`https://v2.api.noroff.dev/rainy-days/${item.id}`);
            let productData = await response.json();
            let product = productData.data;

            let productPrice = product.onSale ? product.discountedPrice : product.price;
            let quantity = parseInt(item.item, 10) || 1; 

            let subtotal = (productPrice * quantity).toFixed(2);
            totalPrice += parseFloat(subtotal);

            checkoutContainer.innerHTML += `
                <div class="checkout-item">
                    <img src="${product.image.url}" alt="${product.image.alt}" class="checkout-item-image">
                    <p class="item-description">
                        ${product.title} <span class="multiply-sign">× ${quantity}</span>
                    </p>
                    <p class="price">NOK ${subtotal}</p>
                </div>
            `;
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            loader.style.display = "none";
        }
    }


    checkoutSummary.innerHTML = `
        <p><span>Subtotal</span><span class="price">NOK ${totalPrice.toFixed(2)}</span></p>
        <p><span>Shipping</span><span class="free">FREE</span></p><hr>
        <p><span>Total</span><span class="total">NOK ${totalPrice.toFixed(2)}</span></p>
        <a href="success.html" class="complete-order-btn" id="complete-order-btn">Complete Order</a>
    `;

    const completeOrderBtn = document.getElementById("complete-order-btn");
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const orderNumber = "RD" + Math.floor(100000 + Math.random() * 900000);
            localStorage.setItem("orderNumber", orderNumber);
            localStorage.removeItem("checkoutCart");
            localStorage.removeItem("data");
            window.location.href = "success.html";
        });
    }
};

checkoutProcess();
