



// Function to update cart quantity display
function updateCartQuantity() {
    let basket = JSON.parse(localStorage.getItem("data")) || [];
    let cartIcon = document.getElementById("cartquantity");

    if (cartIcon) {
        let totalQuantity = basket.reduce((total, item) => total + item.item, 0);
        cartIcon.innerHTML = totalQuantity;
    }
}
