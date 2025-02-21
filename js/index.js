window.onload = function() {
    updateCartQuantity();
};

const bestSellerContainer = document.querySelector(".product-container");

    let generateProducts = async ()=>{
    bestSellerContainer.innerHTML='';
    try{
    let response = await fetch('https://v2.api.noroff.dev/rainy-days')
    let finalItems = await response.json();
    finalItems.data.slice(0,6).forEach(element => { 
        bestSellerContainer .innerHTML += `
       <div class="product">
        <img src=${element.image.url} alt=${element.image.alt} class="product-imgs">
        <p class="product-text">${element.title}</p>
        <p class="product-price">NOK ${element.price}</p>      
        <a href="product.html?id=${element.id}" class="buy-btn">Buy Now</a>
     </div>`;
    })
}catch (error) {
    console.error("Error fetching data:", error);
    }
    };

generateProducts();


