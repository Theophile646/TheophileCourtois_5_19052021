// call for global function
displayCameraList()

// Global function 
async function displayCameraList () {
    const cameras = await getCameras()
    for (let camera of cameras) {
        displayCamera(camera)
        }
    
}

// Fetch camera list from API
function getCameras() {
    return fetch("http://localhost:3000/api/cameras")
    .then(function (data) {
        return data.json()
    }) 
    .then (function(cameras) {
        return cameras
       })
}


// Content creation
function displayCamera (cameras) {
    document.getElementById("product-container").innerHTML += `<h2>${cameras.name}</h2>
                                                                <p>${cameras.description}</p>
                                                                <p>${cameras.price} €</p>
                                                                <img src="${cameras.imageUrl}" alt="${cameras.name}">`
}


