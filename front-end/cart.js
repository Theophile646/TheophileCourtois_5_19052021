//---------------------------- Handling Cart Summary--------------------------------------
// get data from localStorage
let dataFromStorage = JSON.parse(localStorage.getItem("productSummary"));
console.log(dataFromStorage)

// If Cart is empty display "cart empty" else display products
if (!localStorage.getItem("productSummary") || dataFromStorage == 0){
    document.getElementById("product-recap").innerHTML = "<p>Le panier est vide.</p>";

} else {
    displayCartSummary()

}



// For each data stored inject HTML
 function displayCartSummary () {
    for (let data of dataFromStorage) {

        displayProductDetail(data)

    }
}

// Display product summary
function displayProductDetail (data) {
    let parentTable = document.querySelector("#inject-html");
    parentTable.innerHTML += `
                    <tr>
                        <td><i class="fas fa-trash-alt"></i></td>
                        <td><img src="${data.image}" alt="${data.title}"></td>
                        <td>${data.title}</td>
                        <td>${data.price /100}<span> €</span></td>
                        <td>Sum</td>
                    </tr>
    `
};

// Determine Total of cart
function displayCartTotal () {
    let total = 0;

    for (let object of dataFromStorage) {
        total += object.price / 100;
        console.log(total)
    }
    document.getElementById("cart-total").innerHTML = `<p>Le montant total de votre panier est de ${total}<span> €</span>.</p>`
}

displayCartTotal ()


// remove product when click on trash bin
function clickBin () {
    let removeButtons = document.querySelectorAll(".fa-trash-alt");
    let productRow = document.querySelectorAll("tr");

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", () => {

            //Remove object from the array
            dataFromStorage.splice(i, 1)

            // Delete product row
            productRow[i + 1].remove()

            // Update local storage
            localStorage.setItem("productSummary", JSON.stringify(dataFromStorage))
            
            // recalculate Cart Total
            displayCartTotal ()

        });
        
    }

}

clickBin ()

//---------------------------- Handling Form --------------------------------------



