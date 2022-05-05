// getting elements from HTML
const input_val = document.querySelector('#input_val')
const input_arrow = document.querySelector('#input_arrow')
const address_val = document.querySelector('#address_val')
const location_val = document.querySelector('#location_val')
const time_val = document.querySelector('#time_val')
const isp_val = document.querySelector('#isp_val')
const ApiKey ='Your key'

var map = L.map('map').setView([0, 0], 13);

//  to clear input

const clearInput = ()=>{
    input_val.value= ''

}

//get the default IP address
function myIp(){
    fetch('https://api.ipify.org?format=json')
    .then(res=>res.json())
    .then(data => getAddress(data.ip))

}
//  load the default IP of the device
document.addEventListener('DOMContentLoaded', myIp)
    

// get Address
function getAddress(myApi){
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${ApiKey}&ipAddress=${myApi}`) 
    .then(res=>res.json())
    .then(data=>getUserDetails(data))
    
}
// get user details of the ip address

function  getUserDetails(d){
    address_val.innerHTML =  d.ip
    location_val.innerHTML = `${d.location.region} , ${d.location.city}`
    console.log(location_val)
    time_val.innerHTML = d.location.timezone
    isp_val.innerHTML = d.isp
    // display on the map
    function showMap(lat,lng) {

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([lat, lng]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    }
    
    showMap(d.location.lat,d.location.lng)
    

}


// event listener
input_arrow.addEventListener('click', ()=>{
    getAddress(input_val.value),
    clearInput()
    
})

   