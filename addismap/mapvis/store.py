
class Node:
    def __init__(self, id, lat, lng):
        self.id = id
        self.lat = lat
        self.lng = lng

class NodeSet:
    def __init__(self):
        self.nodes = dict()

        self.bounds = dict()
        self.bounds["min_lat"] = 90
        self.bounds["max_lat"] = -90
        self.bounds["min_lng"] = 180
        self.bounds["max_lng"] = -180
    
    def add(self, id, lat, lng):
        self.nodes[id] = Node(id, lat, lng)
        self.bounds["min_lat"] = min(float(self.bounds["min_lat"]), float(lat))
        self.bounds["min_lng"] = min(float(self.bounds["min_lng"]), float(lng))
        self.bounds["max_lat"] = max(float(self.bounds["max_lat"]), float(lat))
        self.bounds["max_lng"] = max(float(self.bounds["max_lng"]), float(lng))
    
    def remove(self, id):
        del self.nodes[id]

    def get_nodes(self):
        return self.nodes
    
    def print_node_set(self):
        for k, n in self.nodes.items():
            print("id: " + str(k) + "\tlat:" + str(n.lat) + "\tlng:" + str(n.lng))

class Edge:
    def __init__(self, id, f, t, w=None):
        #create an edge with weight w from Node f(id) to Node t(id), 
        self.id = id
        self.f = f
        self.t = t
        self.w = w

    def update_weight(self, w):
        if self.w is None:
            self.w = w
        else:
            # dont replace a shorter road with a longer one in the case
            # of two or more roads between the same nodes
            self.w = min(w, self.w)

class EdgeSet:
    def __init__(self):
        self.edges = dict()
        
    def add(self, id, f, t, w):
        edge = (f, t)
        self.edges[edge] = Edge(id, f, t, w)
    
    def remove(self, edge):
        del self.edges[edge]
    
    def get_edges(self):
        return self.edges
    
    def print_edge_set(self):
        for k, e in self.edges.items():
            print("edge: " + str(k) + "\tfrom:" + str(e.f) + "\tto:" + str(e.t) + "\tdistance:" + str(e.w))
