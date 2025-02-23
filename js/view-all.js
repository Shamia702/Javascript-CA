window.onload = function() {
    updateCartQuantity();
};

const itemsContainer = document.querySelector(".items-container");
let genderListContainer = document.querySelector(".genderList");
let allGender=[];

    let displayItems = async (allCheckGender = [])=>{const
         loader = document.getElementById("loader");
        loader.style.display = "flex"; 
    
    itemsContainer.innerHTML='';
    try{

        let response = await fetch('https://v2.api.noroff.dev/rainy-days')
        let finalItems = await response.json();
        let products = finalItems.data;
        products.forEach((element) => { 

        if(!allGender.includes(element.gender)){   
         genderListContainer.innerHTML +=`
         <label>
            <input type="checkbox" onclick='CategoryFilter(this)' value="${element.gender}">
            <span>${element.gender}</span>
         </label>`;
         allGender.push(element.gender)
        }

        if (allCheckGender.length === 0 || allCheckGender.includes(element.gender)) {

       itemsContainer.innerHTML += `
         <div class="items">
                <a href="product.html?id=${element.id}">
                        <img src="${element.image.url}" alt="${element.image.alt}"  class="items-img">
                        <p class="items-text">${element.title}</p>
                         ${
                                element.onSale 
                                ? `<p class="items-price original-price">NOK <s>${element.price}</s></p>
                                   <p class="items-discounted-price">NOK ${element.discountedPrice}</p>`
                                : `<p class="items-price">NOK ${element.price}</p>`
                            }
                </a>
        </div>`
    }

    });

} catch (error) {
console.error("Error fetching data:", error);
} finally {
    loader.style.display = "none";
}
};

displayItems();

let CategoryFilter = (selectedCheckbox) => {
    let checkboxInput = document.querySelectorAll(".genderList input[type='checkbox']");

    checkboxInput.forEach((checkbox) => {
        if (checkbox !== selectedCheckbox) {
            checkbox.checked = false; 
        }
    });

    let selectedGender = selectedCheckbox.checked ? selectedCheckbox.value : null;
    displayItems(selectedGender ? [selectedGender] : []);
};

