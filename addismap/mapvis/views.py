from django.shortcuts import render
from django.http import HttpResponse
from mapvis.store import Node, NodeSet
from mapvis.parser import get_default_parser, print_osm_data
from mapvis.extract import extract_osm_nodes, select_nodes_in_rectangle, extract_osm_edges
from mapvis.adjacency import adjacency_list
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
import os, json

# Create your views here.

def mapapp(request):
    osmPath = "/Users/yohannes/Developer/mapApp/addismap/mapvis/gerji"

    nodes = extract_osm_nodes(osmPath)
    node_set = select_nodes_in_rectangle(nodes, 9.00602,9.01380,38.75469,38.76639 )
    node_set_values = list(node_set.get_nodes().values())
    node_set_values_json = json.dumps([node_set.__dict__ for node_set in node_set_values], cls=DjangoJSONEncoder)

    edges = extract_osm_edges(osmPath)
    edges.print_edge_set()
    
    adj_list = adjacency_list(nodes, edges)
    print(adj_list)
    
    context = {
        'GMAPS_API_KEY': 'AIzaSyAv0SjrNE-LMf6LncO5Lx40XP1VlGVCS6Q',
        'COORDS': node_set_values_json
    }

    return render(request, 'mapvis/mapapp.html', context)

