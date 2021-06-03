// Declaring global variables
let orderId;
let totalPrice;
let contactFirstName;
let contactLastName;


// Getting Data from Storage
let postResultFromLocalStorage = JSON.parse(localStorage.getItem("order"));
orderId = postResultFromLocalStorage.orderId;
contactFirstName = postResultFromLocalStorage.contact.firstName;
contactLastName = postResultFromLocalStorage.contact.lastName;

// Recalcultationg Total Price
function getTotalPrice () {
    let productArray = postResultFromLocalStorage.products;
    totalPrice = 0;

    for (const product of productArray) {
        totalPrice += product.price /100        
    };
return totalPrice    

};

getTotalPrice();

// Display Validation message
function displayValidation () {
    document.getElementById("validation").innerHTML = `
    <h2>Merci ${contactFirstName} ${contactLastName} pour votre commande</h2>
    <p>Le montant total de votre commande est de <span>${totalPrice} €</span>.</p>
    <p>Votre numéro de commande est le <span>${orderId}</span>.</p>`
};

displayValidation ()
