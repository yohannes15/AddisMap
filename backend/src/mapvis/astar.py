from mapvis.store import NodeSet, Node
from mapvis.algorithms import length_haversine
import collections
from collections import namedtuple
import heapq

class PriorityQueue:
    def __init__(self):
        self.elements = []
    
    def empty(self):
        return len(self.elements) == 0
    
    def put(self, item, priority):
        heapq.heappush(self.elements, (priority, item))
    
    def get(self):
        return heapq.heappop(self.elements)[1]

# thanks to @m1sp <Jaiden Mispy> for this simpler version of
# reconstruct_path that doesn't have duplicate entries

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


def a_star_search(graph, start, goal, allNodes): #start and goal have .lat, .lng and .id 
    frontier = PriorityQueue()
    frontier.put(str(start.id), 0)
    came_from = {}
    cost_so_far = {}
    came_from[str(start.id)] = None
    cost_so_far[str(start.id)] = 0
    
    while not frontier.empty():
        current = frontier.get()
        
        if current == goal:
            break
        
        for neighbor in graph[current]:
            weight = graph[current][neighbor]
            new_cost = cost_so_far[current] + weight
            if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                cost_so_far[neighbor] = new_cost
                priority = new_cost + heuristic(goal, neighbor, allNodes)
                frontier.put(neighbor, priority)
                came_from[neighbor] = current

    if str(goal.id) not in came_from:
        return []
    
    path = reconstruct_path(came_from, str(start.id), str(goal.id))
    return path