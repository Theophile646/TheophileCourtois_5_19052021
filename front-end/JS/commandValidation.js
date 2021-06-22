// Declaring global variables
let orderId;
let totalPrice;
let contactFirstName;
let contactLastName;

//Function capitalize FirstLetter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// Getting Data from Storage
let postResultFromLocalStorage = JSON.parse(localStorage.getItem("order"));
orderId = postResultFromLocalStorage.orderId;
contactFirstName = capitalizeFirstLetter(postResultFromLocalStorage.contact.firstName);
contactLastName = capitalizeFirstLetter(postResultFromLocalStorage.contact.lastName);

// Get Image
let displayImageValidation = postResultFromLocalStorage.products[0].imageUrl;

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
    <h1>Merci ${contactFirstName} ${contactLastName} pour votre commande !</h1>
    <img src="${displayImageValidation}" alt="camera">
    <p>Le montant total de votre commande est de <span>${totalPrice} €</span>.</p>
    <p>Votre numéro de commande est le <span>${orderId}</span>.</p>`

    localStorage.removeItem('productSummary')
};

displayValidation ()
