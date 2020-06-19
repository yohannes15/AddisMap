var map;
// var marker1;
// var marker2;
//var previousMarker;
var clickCount = 0;

function initialize() {
    var mapCenterLatLng = shortestPathCoords[0]
    var mapOptions = {
        center: new google.maps.LatLng(mapCenterLatLng[0], mapCenterLatLng[1]),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    displayRoads(map);
    
    //displayMarkers(map)
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

google.maps.event.addDomListener(window, 'load', initialize);


