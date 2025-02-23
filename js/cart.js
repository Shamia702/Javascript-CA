window.onload = function() {
    updateCartQuantity();
};

let emptyCart = document.getElementById("empty-cart");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let productPrices = {};

let generateCartItems = async () => {
    const loader = document.getElementById("loader");
    loader.style.display = "flex"; 
    if (basket.length !== 0) {
        let cartItemsHTML = await Promise.all(basket.map(async (x) => {
            try {
                let response = await fetch(`https://v2.api.noroff.dev/rainy-days/${x.id}`);
                let productData = await response.json();
                let product = productData.data;
                let search = basket.find((item) => item.id === x.id) || { item: 0 };
                
                productPrices[x.id] = product.onSale ? Number(product.discountedPrice) : Number(product.price);

                return `
                    <div class="cart-items">
                        <img width= "100" src="${product.image.url}" alt="${product.image.alt}" class="cart-item-image">
                        <div class="cart-item-details">
                        <div class= "title-price-x">
                        <p class= "cart-product-title">${product.title}</p>
                        ${
                    product.onSale 
                        ? `<p class="product-page-original-price">NOK <s>${product.price}</s></p>
                          <p class="product-page-discounted-price">NOK ${product.discountedPrice}</p>`
                         : `<p class="product-page-price">NOK ${product.price}</p>`
                            }
                
                        
                        </div>
                         <div class="cart-btns">
                                <button class="decrease-btn"onclick="decreaseBtn('${x.id}')">−</button>
                                <input type="text" id="quantity-${x.id}" value="${search.item}" readonly>
                                <button class="increase-btn" onclick="increaseBtn('${x.id}')">+</button>
                            </div>
                            <div class="cart-price-delete">
                         <h3 class="total-price">NOK ${(search.item * productPrices[x.id]).toFixed(2)}</h3>

                         <i class="fa-solid fa-trash" onclick="removeItem('${x.id}')"></i>
                         </div>

                        </div>
                    </div>
                `;
            } catch (error) {
                console.error("Error fetching product details:", error);
                return ``; 
            } finally {
                loader.style.display = "none";
            }
        }));

        shoppingCart.innerHTML = cartItemsHTML.join('');
        totalAmount();
    } else {
        shoppingCart.innerHTML = ``;
        emptyCart.innerHTML = `
            <h5>Your Cart is Empty</h5>
            <a href="view-all.html">
                <button class="viewallbtn">Continue Shopping</button>
            </a>
        `;
    }
};

let increaseBtn = (productId) => {
    let search = basket.find((x)=> x.id=== productId )
    
    if(search ===undefined){
        basket.push({
            id: productId,
            item: 1,
    
        });
    } else{
        search.item+=1
    }
        update(productId);
        generateCartItems();
        localStorage.setItem("data", JSON.stringify(basket))
        updateCartQuantity(); 
    };
    
    let decreaseBtn = (productId) => {
    let search = basket.find((x)=> x.id=== productId )
    
    if (search.item === undefined) return;
    else if (search.item === 0) return;
     else{
        search.item -= 1;
    }
    update(productId);
    basket = basket.filter((x)=>x.item !==0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    updateCartQuantity(); 
    totalAmount(); 
    };
    
    let update = (productId) => {
        let search = basket.find((x) => x.id === productId);
        let quantityInput = document.getElementById(`quantity-${productId}`);
        
        if (quantityInput) {
            quantityInput.value = search ? search.item : 0;
        }
    
        total();
    };

    let total = () =>{
        let cartIcon = document.getElementById("cartquantity");
        cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y, 0);
    }
    
    total()

    let removeItem = (id) => {
        basket = basket.filter((x) => x.id !== id);
    
        if (basket.length === 0) {
            localStorage.removeItem("data");
        } else {
            localStorage.setItem("data", JSON.stringify(basket));
        }
    
        generateCartItems(); 
        updateCartQuantity(); 
        totalAmount();
    };

    let clearCart = ()=>{
        basket = []
        localStorage.removeItem("data");
        localStorage.removeItem("checkoutCart")
        generateCartItems();
        total();
        totalAmount();
    }

    let totalAmount = ()=>{
        let totalBillContainer = document.getElementById("total-bill-container");

        if(basket.length !==0){
            let amount = basket
            .map(x => (productPrices[x.id] ? x.item * productPrices[x.id] : 0))
            .reduce((x, y) => x + y, 0)
            .toFixed(2); 

            totalBillContainer.innerHTML = `
          <p class="total-bill"><span class="total-bill-bold">Total Bill: </span>NOK ${amount}</p>
       <div class="button-container">
    <a href="checkout.html"><button onclick="proceedToCheckout()"class="cartcheckoutbtn">Proceed to Checkout</button></a>
    <button onclick="clearCart()"class="clearcartbtn">Clear Cart</button>
</div> `
        }  else {
           
            totalBillContainer.innerHTML = "";
        }
    
    }
    function proceedToCheckout() {
        if (basket.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        localStorage.setItem("checkoutCart", JSON.stringify(basket)); 
        localStorage.removeItem("data")
        window.location.href = "checkout.html"; 
    }
    
    generateCartItems(); 
    