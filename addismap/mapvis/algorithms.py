from mapvis.store import NodeSet, Node
from math import sqrt, radians, sin, cos, asin

# returns a list with elements in order of the path
# between the start and end of a graph
# @param parent dict the mapping between node and parent
# @param start int the starting node
# @param end int the ending node
def backtrace(parent, start, end):
    path = [end]
    while path[-1] != start:
        path.append(parent[path[-1]])
    path.reverse()
    return path

# Uses dijkstra's algorithm to find the shortest path
# @param graph list of lists, adjacency list
# @param source int the source node to start the search
# @param target int the target node to search for
def dijkstra(graph, source, target):
    queue = []
    visited = {}
    #distance = {}
    shortest_distance = {}
    parent = {}
    shortest_path_to_target = []
    
    for node in graph:
        #distance[node] = None
        visited[node] = False
        parent[node] = None
        shortest_distance[node] = float("inf")
    
    queue.append(source)
    #distance[source] = 0
    while len(queue) != 0:
        current = queue.pop(0)
        visited[current] = True
        if current == target:
            shortest_path_to_target = backtrace(parent, source, target)
            #break
        for neighbor in graph[current]:
            if visited[neighbor] == False:
            	if graph[current][neighbor] < shortest_distance[neighbor]:
            	    shortest_distance[neighbor] = graph[current][neighbor]
            	    parent[neighbor] = current
            	    queue.append(neighbor)
    return shortest_path_to_target

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