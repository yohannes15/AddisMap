var map;
// var marker1;
// var marker2;
//var previousMarker;
var clickCount = 0;
var startLatLng = shortestPathCoords[0]
var destinationLatLng = shortestPathCoords[shortestPathCoords.length - 1]

function initialize() {

    var mapOptions = {
        center: new google.maps.LatLng(startLatLng[0], startLatLng[1]),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    displayRoads(map);

    var start = new google.maps.LatLng(startLatLng[0], startLatLng[1])
    var target = new google.maps.LatLng(destinationLatLng[0], destinationLatLng[1])

    createStartMarker(map, start, "");
    createDestinationMarker(map, target, "");


    var directionsDisplay = new google.maps.DirectionsRenderer()
    var directionsService = new google.maps.DirectionsService()

    var mapDirOptions = {
        center: new google.maps.LatLng(startLatLng[0], startLatLng[1]),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    dirMap = new google.maps.Map(document.getElementById("map_dir_canvas"), mapDirOptions);

    directionsDisplay.setMap(dirMap)

    var request = {
        origin: start,
        destination: target,
        travelMode: 'DRIVING'
        
    }
    
    directionsService.route(request, function(result, status){

        if (status == "OK"){
            directionsDisplay.setDirections(result);
        }

    });

}

function createPolyline(map, path) {
    var polyline = new google.maps.Polyline({
      path: path,
      map: map
    });
  }

function displayRoads(map) {
    var points = new google.maps.MVCArray();
    for (i=0; i<shortestPathCoords.length; i++) {
        latlng = shortestPathCoords[i];
        points.push(new google.maps.LatLng(latlng[0], latlng[1]))
    }
    console.log(points)
    createPolyline(map, points);
}


function createStartMarker(map, latlng, title) {
    return new google.maps.Marker({
        map: map,
        position: latlng,
        title: title,
        icon: 'http://maps.google.com/mapfiles/kml/paddle/S.png'
    });
}

function createDestinationMarker(map, latlng, title) {
    return new google.maps.Marker({
        map: map,
        position: latlng,
        title: title,
        icon: 'http://maps.google.com/mapfiles/kml/paddle/E.png'
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

