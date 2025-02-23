window.onload = function() {
    updateCartQuantity();
};

const saleItemsContainer = document.querySelector(".product-container");

    let generateProducts = async ()=>{
        const loader = document.getElementById("loader");
    loader.style.display = "flex"; 

    saleItemsContainer.innerHTML='';
    try{
    let response = await fetch('https://v2.api.noroff.dev/rainy-days')
    let finalItems = await response.json();
    let products = finalItems.data;
    let onSaleProducts = products.filter(product => product.onSale === true);
    onSaleProducts.forEach(element => { 
        saleItemsContainer.innerHTML += `
       <div class="product">
       <a href="product.html?id=${element.id}">
        <img src=${element.image.url} alt=${element.image.alt} class="product-imgs">
        <p class="product-text">${element.title}</p>
       <p class="product-price">NOK ${element.price}</p> 
        <p class="product-discounted-price">NOK ${element.discountedPrice}</p>      
        </a>
     </div>`;
    })
}catch (error) {
    console.error("Error fetching data:", error);
    } finally {
        loader.style.display = "none";
    }
};

generateProducts();


