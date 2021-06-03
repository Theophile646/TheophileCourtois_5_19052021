//---------------------------- Cart Page --------------------------------------
//---------------------------- Handling Cart Summary--------------------------------------
// get data from localStorage
let dataFromStorage = JSON.parse(localStorage.getItem("productSummary"));

// If Cart is empty display "cart empty" else display products
if (!localStorage.getItem("productSummary") || dataFromStorage == 0){
    document.getElementById("product-recap").innerHTML = "<p>Le panier est vide.</p>";

} else {
    displayCartSummary()

};



// For each data stored inject HTML
 function displayCartSummary () {
    for (let data of dataFromStorage) {

        displayProductDetail(data)

    }
};

// Display product summary
function displayProductDetail (data) {
    let parentTable = document.querySelector("#inject-html");
    parentTable.innerHTML += `
                    <tr>
                        <td>${data.title}</td>
                        <td><img src="${data.image}" alt="${data.title}"></td>
                        <td>${data.price /100}<span> €</span></td>
                        <td><i class="fas fa-trash-alt"></i></td>
                    </tr>
    `
};


// remove product when click on trash bin
function clickBin () {
    let removeButtons = document.querySelectorAll(".fa-trash-alt");
    let productRow = document.querySelectorAll("tr");

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", () => {

            //Remove object from the array
            dataFromStorage.splice(i, 1);

            // Delete product row
            productRow[i + 1].remove();

            // Update local storage
            localStorage.setItem("productSummary", JSON.stringify(dataFromStorage));
            
            // recalculate Cart Total
            displayCartTotal ()

        });
        
    };

};

clickBin ();

// Determine Total of cart
function displayCartTotal () {
    let total = 0;

    for (let object of dataFromStorage) {
        total += object.price / 100;
    };
    document.getElementById("cart-total").innerHTML = `
    <p>Le montant total de votre panier est de <span>${total} €</span>.</p>`;
    return total
};

displayCartTotal ();

//---------------------------- Handling Form --------------------------------------

// If input is true when submitting, add the input value into an object 
/*
function checkValid () {
    let submitButton = document.getElementById("submit-button");
    let inputs = document.querySelectorAll("form input");
    let contact = {};
    let products = [];
    let id;
   


    submitButton.addEventListener("click", function (e) {
        e.preventDefault();

       

        // --if--Create Array containning id from products in Cart
        for (const productInCart of dataFromStorage) {
            if (productInCart.hasOwnProperty("identifier")) {
                id = productInCart["identifier"];
                products.push(id)
            };
        };


        
         // --if--Create object containing data from Form
         for (let i = 0; i < inputs.length - 1; i++) {
            if (inputs[i].reportValidity()) {
                contact[inputs[i].name] = inputs[i].value                
            };

        };

        let objectToSend = {contact, products}

        // --If-- Form is valid send FormResults and identifierArray (objectToSend) to the server
        fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: { 
        'Content-Type': 'application/json' 
        },
            body: JSON.stringify(objectToSend)

        })
        .then(async(res) => {
            console.log("Request complete! response:", res);
            let postResult = await res.json();
            localStorage.setItem("order", JSON.stringify(postResult))
            

          })
          .then (() => {
            window.location.replace('commandValidation.html')
          });
          
    });

};

checkValid()
*/
let inputs = document.querySelectorAll("form input");
let submitButton = document.getElementById("submit-button");
let contact = {};
let products = [];
let id;
   

submitButton.addEventListener("click", function(e) {
    e.preventDefault()
    var valid = true;
    for (const input of inputs) {
        valid &= input.reportValidity();
        if(!valid) {
            break;
        };
        
    };
    if(valid) {

        
        // --if--Create Array containning id from products in Cart
        for (const productInCart of dataFromStorage) {
            if (productInCart.hasOwnProperty("identifier")) {
                id = productInCart["identifier"];
                products.push(id)
            };
        };

        // --if--Create object containing data from Form
        for (let i = 0; i < inputs.length - 1; i++) {
            if (inputs[i].reportValidity()) {
                contact[inputs[i].name] = inputs[i].value                
            };

        };

        let objectToSend = {contact, products}

        // --If-- Form is valid send FormResults and identifierArray (objectToSend) to the server
        fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: { 
        'Content-Type': 'application/json' 
        },
            body: JSON.stringify(objectToSend)

        })
        .then(async(res) => {
            console.log("Request complete! response:", res);
            let postResult = await res.json();
            localStorage.setItem("order", JSON.stringify(postResult))
            

          })
          .then (() => {
            window.location.replace('commandValidation.html')
          });

    }
})