from mapvis.store import Node, NodeSet, Edge, EdgeSet
from mapvis.parser import get_default_parser, print_osm_data
from mapvis.extract import extract_osm_nodes, select_nodes_in_rectangle, extract_osm_edges
from math import sqrt, radians, sin, cos, asin

def length_haversine(p1, p2):
    # calculate the distance between two points using the Haversine
    # formula which incorporates the earth's curvature, see
    # http://en.wikipedia.org/wiki/Haversine_formula.
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

def adjacency_list(nodes, edges): #edges is edge_set.get_edges() which is a dictionary 
    adj_list = {}
    #go through all the nodes and set them as key of dictionary
    for node_id, node_info in nodes.nodes.items():
        adj_list[node_id] = {}
        #find the neighbors of the node by checking for it in the edge tuple[0] and if then assinging it a neighbor of tuple[1]
        #and the dictionary also holds the distance.
        for edge in edges.edges.keys():
            if node_id == edge[0]:
                adj_list[node_id][edge[1]] = length_haversine(node_info, nodes.nodes[edge[1]])
    
    return adj_list

