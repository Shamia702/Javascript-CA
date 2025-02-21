window.onload = function() {
    updateCartQuantity();
};

const itemsContainer = document.querySelector(".items-container");
let genderListContainer = document.querySelector(".genderList");
let allGender=[];

    let displayItems = async (allCheckGender = [])=>{
    itemsContainer.innerHTML='';
    try{
        let response = await fetch('https://v2.api.noroff.dev/rainy-days')
        let finalItems = await response.json();

        finalItems.data.forEach((element) => { 

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
                <img src="${element.image.url}" alt="${element.image.alt}"  class="items-img">
                <p class="items-text">${element.title}</p>
                <P class="items-price">NOK ${element.price}</P>
                <a href="product.html?id=${element.id}" class="buy-btn">Buy Now</a>
        </div>`
    }

    });

} catch (error) {
console.error("Error fetching data:", error);
}
};

displayItems();

let CategoryFilter = (selectedCheckbox) => {
    let checkboxInput = document.querySelectorAll(".genderList input[type='checkbox']");

    checkboxInput.forEach((checkbox) => {
        if (checkbox !== selectedCheckbox) {
            checkbox.checked = false; // Uncheck all other checkboxes
        }
    });

    let selectedGender = selectedCheckbox.checked ? selectedCheckbox.value : null;

    // If no checkboxes are checked, show all items
    displayItems(selectedGender ? [selectedGender] : []);
};

