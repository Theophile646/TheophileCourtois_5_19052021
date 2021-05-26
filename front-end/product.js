// Get queryString
const id = window.location.search.replace("?", "")

// call for global function
displayCamera()


// Global function 
async function displayCamera () {
    
    const cameraById = await getCameraById()
    return displayCameraDetail (cameraById)
}



// Fonction getCameraDetail
function getCameraById() {
return fetch(`http://localhost:3000/api/cameras/${id}`)
.then(function (data) {
    return data.json()
}) 
.then (function(cameraById) {
    return cameraById
   })
}



// HTML Content
function displayCameraDetail (cameraById) {

    // HTML writting
    document.getElementById("product").innerHTML += `
    <div class="product-info">

                <div class="product-info__details">
                    <h2>${cameraById.name}</h2>
                    <p>${cameraById.description}</p>
                    <p>${cameraById.price / 100} <span class="€">€</span></p>
                </div>

                <div class="product-info__model">
                    <label for="choose-model">Choissisez votre model :</label><br>
                    <select name="model" id="choose-model">
                        <option value="default">Choissisez un model</option>                      
                    </select>
                </div>

                <img src="${cameraById.imageUrl}" alt="${cameraById.name}">


                <button type="button" class="product-info__button" id="addToCart">Ajouter au panier</button>

            </div>`

           

            // display options
            let lensesList = cameraById.lenses
            for (let lense of lensesList) {
                optionsCreation = document.getElementById("choose-model").innerHTML += ` 
                <option value="${lense}">${lense}</option>`
                       }

            //change doc title
            document.title = `${cameraById.name}` 

            // get data when adding to cart
            
            document.getElementById("addToCart").addEventListener("click", () => {
                
                //get selected option

                let choosenLense = document.querySelector("#choose-model").value

                // Si model = default alors ALERT

                if (choosenLense === "default") {
                    window.alert("Veuillez selectionner un modèle.")
                } else {
                
                     // create object containing data

                    var productSum = {
                        identifier: id,
                        title: cameraById.name,
                        price: cameraById.price,
                        image: cameraById.imageUrl,
                        option: choosenLense
                    }
                    console.log(productSum);

            }

            let dataStorage = JSON.parse(localStorage.getItem("productSummary"));
            console.log(dataStorage)
            
            
                if (!localStorage.getItem("productSummary")) {
                    dataStorage = [];
                    dataStorage.push(productSum);
                    localStorage.setItem("productSummary", JSON.stringify(dataStorage))

                } else {
                    dataStorage.push(productSum);
                    localStorage.setItem("productSummary", JSON.stringify(dataStorage))
                    console.log(dataStorage)
                }
                
            });


            
};
