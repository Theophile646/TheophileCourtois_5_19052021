//---------------------------- Cart Page --------------------------------------
//---------------------------- Handling Cart Summary--------------------------------------
// get data from localStorage
let dataFromStorage = JSON.parse(localStorage.getItem("productSummary"));

let total

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
    };
    //and display total
    displayCartTotal ();
};

// Display product summary
function displayProductDetail (data) {
    let parentTable = document.querySelector("#inject-html");
    parentTable.innerHTML += `
                    <tr>
                        <td>${data.title}</td>
                        <td><img src="${data.image}" alt="${data.title}"></td>
                        <td class="price">${data.price /100} €</td>
                        <td><i class="fas fa-trash-alt delete-button"></i></td>
                    </tr>`    
};

// --------------------------- delete button ------------
let removeButtons = document.querySelectorAll(".fa-trash-alt");
let removeButtonsArray = Array.from(removeButtons);
let productRow = document.querySelectorAll("tr");

for (let i = 0; i < removeButtonsArray.length; i++) {
    removeButtonsArray[i].addEventListener("click", () => {
        if (i >= removeButtonsArray.length) {
            dataFromStorage.pop()
            productRow[i + 1].remove();
        }else {
            //Remove object from the array
            dataFromStorage.splice(i, 1);

            // Delete product row
            productRow[i + 1].remove();

            //delet from nodelist
            removeButtonsArray.splice(i, 1);
        };        

        // Update local storage
        localStorage.setItem("productSummary", JSON.stringify(dataFromStorage));
        
        // recalculate Cart Total
        displayCartTotal ()

        // If cart is empty display "empty card"
        if(total === 0) {
            document.getElementById("product-recap").innerHTML = "<p>Le panier est vide.</p>";
        }
    });    
};

// Determine Total of cart
function displayCartTotal () {
    total = 0;
    for (let object of dataFromStorage) {
        total += object.price / 100;
    };
    document.getElementById("cart-total").innerHTML = `
        <p>Le montant total de votre panier est de <span>${total} €</span>.</p>`;
        return total
};

//---------------------------- Handling Form --------------------------------------
//Variable declaration
let inputs = document.querySelectorAll("form input");
let submitButton = document.getElementById("submit-button");
let contact = {};
let products = [];
let id;
   
// when "validate order" is clicked, form is checked
submitButton.addEventListener("click", function(e) {
    e.preventDefault()
    var valid = true;
    for (const input of inputs) {
        valid &= input.reportValidity();
        if(!valid) {
            break;
        };        
    };

    if (dataFromStorage.length === 0) {
        window.alert("Votre panier est vide, veuillez selectionner un article avant de valider votre commande !");
    }

    // if it is valid
    if(valid && dataFromStorage.length != 0) {

        // an Array containning id from products in Cart is created
        for (const productInCart of dataFromStorage) {
            if (productInCart.hasOwnProperty("identifier")) {
                id = productInCart["identifier"];
                products.push(id)
            };
        };

        // aswell as an object containing data from Form
        for (let i = 0; i < inputs.length - 1; i++) {
            if (inputs[i].reportValidity()) {
                contact[inputs[i].name] = inputs[i].value                
            };

        };

        let objectToSend = {contact, products}

        // Then the formResults and identifierArray (objectToSend) are sent to the server
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
    };
});