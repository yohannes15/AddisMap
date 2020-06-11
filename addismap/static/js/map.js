var map;

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(9.00977, 38.76003),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    console.log(mapOptions.center.LatLng)
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    google.maps.event.addListener(map, 'click', function(event) {
        createMarker(map, event.latLng, "Click: "+event.latLng);
    });
    //displayMarkers(map)
}

google.maps.event.addDomListener(window, 'load', initialize);

function createMarker(map, latlng, title) {
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: title
    });
}

// function displayMarkers(map) {
//     COORDS.forEach(function(item){
//         createMarker(map, new google.maps.LatLng(item.lat,item.lng), ""+item.id);
//       });
// }
