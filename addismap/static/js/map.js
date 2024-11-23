let map;
let marker1 = null;
let marker2 = null;
let clickCount = 0;

function initialize() {
    const mapOptions = {
        center: new google.maps.LatLng(38.9897, -77.0297),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // Add click listener to map
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    if (clickCount === 0) {
        // Remove previous start marker if exists
        if (marker1) {
            marker1.setMap(null);
        }
        marker1 = new google.maps.Marker({
            position: location,
            map: map,
            label: 'S',
            animation: google.maps.Animation.DROP
        });
        document.getElementById('start-latitude').value = location.lat();
        document.getElementById('start-longitude').value = location.lng();
        clickCount = 1;
    } else {
        // Remove previous destination marker if exists
        if (marker2) {
            marker2.setMap(null);
        }
        marker2 = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/flag.png'
            },
            animation: google.maps.Animation.DROP
        });
        document.getElementById('destination-latitude').value = location.lat();
        document.getElementById('destination-longitude').value = location.lng();
        clickCount = 0;
    }
}

// Update form when markers are dragged
function updateForm() {
    if (marker1 && marker1.getPosition()) {
        document.getElementById('start-latitude').value = marker1.getPosition().lat();
        document.getElementById('start-longitude').value = marker1.getPosition().lng();
    }
    if (marker2 && marker2.getPosition()) {
        document.getElementById('destination-latitude').value = marker2.getPosition().lat();
        document.getElementById('destination-longitude').value = marker2.getPosition().lng();
    }
}

// Initialize map when window loads
google.maps.event.addDomListener(window, 'load', initialize);

// Add form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('latlngform');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!marker1 || !marker2) {
                e.preventDefault();
                alert('Please select both start and destination points on the map.');
            }
        });
    }
});


function createPolyline(map, path) {
    var polyline = new google.maps.Polyline({
      path: path,
      map: map
    });
  }



function displayRoads(map) {
    var points = new google.maps.MVCArray();
    for (i=0; i<shortestPath.length; i++) {
        id = shortestPath[i];
        nodeid = parseInt(id)
        nodes.forEach(function(item){
            if (nodeid === item.id){
                points.push(new google.maps.LatLng(item.lat, item.lng))
            }
        }); 
    }

    createPolyline(map, points);
}


