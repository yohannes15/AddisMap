from collections import deque
from mapvis.astar import reconstruct_path

def breadth_first_search(graph, start, goal):
    frontier = deque()
    frontier.append(str(start.id))
    came_from = {}
    came_from[str(start.id)] = None
    
    while frontier:
        current = frontier.popleft()
        
        if current == goal:
            break
        
        for neighbor in graph[current]:
            if neighbor not in came_from:
                frontier.append(neighbor)
                came_from[neighbor] = current
    
    path = reconstruct_path(came_from, str(start.id), str(goal.id))
    return path


