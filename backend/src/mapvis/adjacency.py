from mapvis.store import Node, NodeSet, Edge, EdgeSet
from mapvis.parser import get_default_parser, print_osm_data
from mapvis.extract import extract_osm_nodes, extract_osm_edges
from mapvis.algorithms import length_haversine

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

