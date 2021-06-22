// call for global function
displayCameraList();

// Global function 
async function displayCameraList () {
    const cameras = await getCameras();
    for (let camera of cameras) {
        displayCamera(camera)
        };
    
};

// Fetch camera list from API
function getCameras() {
    return fetch("http://localhost:3000/api/cameras")
    .then(function (data) {
        return data.json()
    }) 
    .then (function(cameras) {
        return cameras
       })
};


// HTML Content
function displayCamera (cameras) {
    document.getElementById("product-list").innerHTML += `
        <a href="./product.html?${cameras._id}">
        <div class="product-container">
        <h2>${cameras.name}</h2>
        <p>${cameras.description}</p>
        <p class="price">${cameras.price / 100} <span class="€">€</span></p>
        <img src="${cameras.imageUrl}" alt="${cameras.name}">
        </div></a>`
}


