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


'''def a_star(graph, start_node, stop_node):
    # open_list is a list of nodes which have been visited, but who's neighbors
    # haven't all been inspected, starts off with the start node
    # closed_list is a list of nodes which have been visited
    # and who's neighbors have been inspected
    open_list = set([start_node])
    closed_list = set([])

    # g contains current distances from start_node to all other nodes
    # the default value (if it's not found in the map) is +infinity
    g = {}

    g[start_node] = 0

    # parents contains an adjacency map of all nodes
    parents = {}
    parents[start_node] = start_node

    while len(open_list) > 0:
        current = None

        # find a node with the lowest value of f() - evaluation function
        for v in open_list:
            if current == None or g[v] + self.h(v) < g[current] + self.h(current):
                current = v

        if current == None:
            print('Path does not exist!')
            return None

        # if the current node is the stop_node
        # then we begin reconstructin the path from it to the start_node
        if current == stop_node:
            reconst_path = []

            while parents[current] != current:
                reconst_path.append(current)
                current = parents[current]

            reconst_path.append(start_node)

            reconst_path.reverse()

            print('Path found: {}'.format(reconst_path))
            return reconst_path

        for neighbor in graph[current]:
            weight = graph[current][neighbor]
            # if the current node isn't in both open_list and closed_list
            # add it to open_list and note n as it's parent
            if neighbor not in open_list and neighbor not in closed_list:
                open_list.add(neighbor)
                parents[neighbor] = current
                g[neighbor] = g[current] + weight
            # otherwise, check if it's quicker to first visit current, then neigbor
            # and if it is, update parent data and g data
            # and if the node was in the closed_list, move it to open_list
            else:
                if g[neighbor] > g[current] + weight:
                    g[neighbor] = g[current] + weight
                    parents[neighbor] = current

                    if neighbor in closed_list:
                        closed_list.remove(neighbor)
                        open_list.add(neighbor)

        # remove n from the open_list, and add it to closed_list
        # because all of his neighbors were inspected
        open_list.remove(current)
        closed_list.add(current)

    print('Path does not exist!')
    return []'''




