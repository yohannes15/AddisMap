from mapvis.parser import get_default_parser
from mapvis.store import NodeSet, EdgeSet

def extract_osm_nodes(f_name):
    # parse the OSM file
    print("Loading the data...")
    parser = get_default_parser(f_name)
    node_set = NodeSet()

    for node in parser.iter_nodes():
        node_set.add(node['id'], node['lat'], node['lon'])

    return node_set

def select_nodes_in_rectangle(nodes, min_lat, max_lat, min_lng, max_lng):
    nodes_in_rectangle = NodeSet()
    for k, node in nodes.get_nodes().items():
        if(float(min_lat)< float(node.lat) and float(node.lat) < float(max_lat) and float(min_lng)< float(node.lng) and \
            float(node.lng)<float(max_lng)):
            nodes_in_rectangle.add(k, node.lat, node.lng)
    
    return nodes_in_rectangle

def extract_osm_edges(f_name):
    # Parse the supplied OSM file
    print("Loading the data")
    parser = get_default_parser(f_name)

    edge_set = EdgeSet()

    for way in parser.iter_ways():
        id = way['id']
        road = way['road']
        for i in range(len(road)-1):
            edge_set.add(id, road[i], road[i+1], float('inf'))

    return edge_set

    # Fill in the missing code
    # pssst OSMParser has a function called iter_ways()
    # print what that function returns

