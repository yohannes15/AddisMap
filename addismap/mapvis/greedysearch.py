from mapvis.store import NodeSet, Node
from mapvis.algorithms import length_haversine
from mapvis.astar import PriorityQueue
import collections
from collections import namedtuple
import heapq

def reconstruct_path(came_from, start, goal):
    current = goal
    path = []
    while current != start:
        path.append(current)
        current = came_from[current]
    path.append(start) # optional
    path.reverse() # optional
    return path

def heuristic(goal, neighbor, allNodes):
    #cost in hours = distance / speed = km / (km/h)
    #find the nodeset item equal to the neighobr id
    node = namedtuple('Node', ['lat', 'lng'])
    speedLimit = 70
    neighborLatLng = node(allNodes.nodes[neighbor].lat, allNodes.nodes[neighbor].lng)
    distance = length_haversine(goal, neighborLatLng)
    return distance/speedLimit


def greedy_search(graph, start, goal, allNodes): #start and goal have .lat, .lng and .id 
    frontier = PriorityQueue()
    frontier.put(str(start.id), 0)
    came_from = {}
    came_from[str(start.id)] = None
    
    while not frontier.empty():
        current = frontier.get()
        
        if current == goal:
            break
        
        for neighbor in graph[current]:
            if neighbor not in came_from:
                priority = heuristic(goal, neighbor, allNodes)
                frontier.put(neighbor, priority)
                came_from[neighbor] = current
    
    if str(goal.id) not in came_from:
        return []

    path = reconstruct_path(came_from, str(start.id), str(goal.id))
    
    return path
