// Get queryString
const id = window.location.search.replace("?", "");

// call for global function
displayCamera();


// Global function 
async function displayCamera () {    
    const cameraById = await getCameraById();
    return displayCameraDetail (cameraById);
};



// Fonction getCameraDetail
function getCameraById() {
return fetch(`http://localhost:3000/api/cameras/${id}`)
.then(function (data) {
    return data.json();
}) 
.then (function(cameraById) {
    return cameraById;
   })
};



// HTML Content
function displayCameraDetail (cameraById) {
    // HTML writting
    document.getElementById("product").innerHTML += `
    <div class="product-info">
                <div class="product-info__details">
                    <h1>${cameraById.name}</h1>
                    <p>${cameraById.description}</p>
                    <p class="price">${cameraById.price / 100} €</p>
                </div>
                <div class="product-info__model">
                    <label for="choose-model">Choissisez votre modèle :</label><br>
                    <select name="model" id="choose-model">
                        <option value="default">Choissisez un modèle</option>                      
                    </select>
                </div>
                <img src="${cameraById.imageUrl}" alt="${cameraById.name}">
                <button type="button" class="button button--primary" id="addToCart">Ajouter au panier</button>
            </div>`;

    // display options
    let lensesList = cameraById.lenses;
    for (let lense of lensesList) {
        optionsCreation = document.getElementById("choose-model").innerHTML += ` 
        <option value="${lense}">${lense}</option>`
    };

    //change doc title
    document.title = `${cameraById.name}`;

    // get data when adding to cart            
    document.getElementById("addToCart").addEventListener("click", () => {
        
        //get selected option
        let choosenLense = document.querySelector("#choose-model").value;

        // If model = default then ALERT
        if (choosenLense === "default") {
            window.alert("Veuillez selectionner un modèle.");
        } else {                
            // create object containing data
            var productSum = {
                identifier: id,
                title: cameraById.name,
                price: cameraById.price,
                image: cameraById.imageUrl,
                option: choosenLense
            };

            // Send data to local Storage
            let dataStorage = JSON.parse(localStorage.getItem("productSummary"));
    
    
            if (!localStorage.getItem("productSummary")) {
                dataStorage = [];
                dataStorage.push(productSum);
                localStorage.setItem("productSummary", JSON.stringify(dataStorage))

            } else {
                dataStorage.push(productSum);
                localStorage.setItem("productSummary", JSON.stringify(dataStorage))
            };

            // Update cartCounter
            cartCounterProduct ();

            // Confirmation Pop-up
            let popUp = document.getElementById("popup");               
            let homeButton = document.getElementById("home__button");
            let cartButton = document.getElementById("cart__button");
            popUp.style.display = "block";

            // click on button "carry on buying"
            homeButton.addEventListener("click", () => {
                window.location.replace('index.html');
            });

            // click on button "confirm the order"
            cartButton.addEventListener("click", () => {
                window.location.replace('cart.html');
            });

            //click outside of popup will remove it
            window.addEventListener("click", (event) => {
                if (event.target == popUp) {
                    popUp.style.display = "none";
                    
                };

            });
            
        };

    });
                
};

