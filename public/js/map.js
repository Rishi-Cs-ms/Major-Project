let maptoken=mapToken;
console.log(maptoken);
mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, 
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup()
    .setHTML(`<h4>${listing.location} </h4><p>Final Location Provided after Booking</p>`))
    .addTo(map);
