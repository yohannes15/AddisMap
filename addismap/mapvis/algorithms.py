from mapvis.store import NodeSet, Node
from math import sqrt, radians, sin, cos, asin

def length_haversine(p1, p2):
    # calculate the distance between two points using the Haversine
    # formula which incorporates the earth's curvature
    lat1 = float(p1.lat)
    lng1 = float(p1.lng)
    lat2 = float(p2.lat)
    lng2 = float(p2.lng)
    lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
    dlat = lat2 - lat1
    dlng = lng2 - lng1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlng / 2) ** 2
    c = 2 * asin(sqrt(a))
    # return the distance in m
    return 6372797.560856 * c
    
def closestNodeTo(nodeLatLng, AllNodeSet):
    closestNode, shortestDistance = None, float('inf')
    for i,n in AllNodeSet.nodes.items():
        distance = length_haversine(n, nodeLatLng)
        if distance < shortestDistance:
            closestNode = n
            shortestDistance = min(shortestDistance, distance)
    
    print("clostest id is " + closestNode.id)
    return closestNode

def shortestPathLatLng(shortestPath, AllNodeSet):
    shortestPathCoords = []
    for nodeid in shortestPath:
        for i,node in AllNodeSet.nodes.items():
            if int(node.id) == int(nodeid):
                shortestPathCoords.append([float(node.lat), float(node.lng)])
    return shortestPathCoords
