from collections import deque
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
    queue = deque([])
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
        current = queue.popleft()
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

