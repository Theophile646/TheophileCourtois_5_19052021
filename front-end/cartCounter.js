// Display number of product on top of the cart icon for home page & product page
function cartCounterProduct () {
    let cartCounterNumber = localStorage.productSummary;
    cartCounterNumber = JSON.parse(cartCounterNumber).length;
    
    let cartCounter = document.getElementById("cartCounter");
    
    cartCounter.innerHTML = `
                    <i class="fas fa-shopping-cart gradient-icon counter-icon"><mark class="counter-style tada">${cartCounterNumber}</mark></i>`
};


cartCounterProduct();