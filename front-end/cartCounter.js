// Display number of product on top of the cart icon for home page & product page
function cartCounterProduct() {
    let cartCounterNumber = JSON.parse(localStorage.productSummary).length;
    let cartCounterIcon = document.getElementById("cartCounter-icon");

    if (!cartCounterNumber == 0) {
        cartCounterIcon.innerHTML = `
        <mark class="counter-style tada">${cartCounterNumber}</mark>`
    }
}

if (localStorage.getItem('productSummary') !== null) {
    cartCounterProduct();

}

