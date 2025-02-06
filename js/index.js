fetch('https://v2.api.noroff.dev/rainy-days')
  .then((response) => response.json())
  .then((json) => console.log(json));

let bestSellerContainer = document.querySelector(".product-container");

let productsData = [{
    id: "jacket-001",
    desc: "Grey and Black jacket for women - Perfect for all weathers.",
    price: "350 NOK",
    button: "Buy Now",
    img: "images/Jacket1.jpg",
    alt: "grey orange jacket and designs on it with black color.",
},
{
    id: "jacket-002",
    desc: "Men's Waterproof Rain Jacket,<br>Windbreaker For Hiking.",
    price: "600 NOK",
    button: "Buy Now",
    img: "images/Jacket2.jpg",
    alt: "light black color jacket, stips on shoulder with grey color.",
},
{
    id: "jacket-003",
    desc: "Men's Core Rain Jacket- red and black.",
    price: "550 NOK",
    button: "Buy Now",
    img: "images/Jacket3.jpg",
    alt: "red and black jacket.",
},
{
    id:"jacket-004",
    desc: "Outdoor Everyday Rain Jacket Womens.",
    price: "250 NOK",
    button: "Buy Now",
    img: "images/Jacket4.jpg",
    alt: "black jacket and some patterns on it with white colors.",
},
{
    id: "jacket-005",
    desc: "Most Durable Backpacking Rain Jacket.",
    price: "320 NOK",
    button: "Buy Now",
    img: "images/Jacket5.jpg",
    alt: "solid grey jacket.",
},
{
    id: "jacket-006",
    desc: "Antora Rain Men-Hardshell jacket- Black.",
    price: "399 NOK",
    button: "Buy Now",
    img: "images/Jacket6.jpg",
    alt: "black colored jacket with some stips on sleeves with grey and some touches with white on chest.",
},
];

let generateProducts = () => {
    return (bestSellerContainer.innerHTML = productsData
        .map((x)=>{
            let {id, desc, price, button, img, alt} = x;
        return `
     <div id=product-id-${id} class="product">
        <img src=${img} alt=${alt} class="product-imgs">
        <p class="product-text">${desc}</p>
        <p class="product-price">${price}</p>      
        <a href="product.html" class="buy-btn">${button}</a>
     </div>`;
    }).join(""));
};

generateProducts();


