from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from mapvis.store import Node, NodeSet
from mapvis.parser import get_default_parser, print_osm_data
from mapvis.extract import extract_osm_nodes, select_nodes_in_rectangle, extract_osm_edges
from mapvis.adjacency import adjacency_list
from mapvis.algorithms import dijkstra, closestNodeTo
from mapvis.parser_POST import POST_parser
from mapvis.forms import LatLongForm
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from collections import namedtuple
import os, json

# Create your views here.

def mapapp(request):
    osmPath = "/Users/yohannes/Developer/mapApp/addismap/mapvis/gerji"

    nodes = extract_osm_nodes(osmPath)
    node_set = select_nodes_in_rectangle(nodes, 9.00602,9.01380,38.75469,38.76639 )
    node_set_values = list(node_set.get_nodes().values())
    node_set_values_json = json.dumps([node_set.__dict__ for node_set in node_set_values], cls=DjangoJSONEncoder)
    edges = extract_osm_edges(osmPath)
    
    adj_list = adjacency_list(nodes, edges)
    #dijkstra(adj_list, '1732976686', '1732976651')
    
    node = namedtuple('Node', ['lat', 'lng'])
    nodes.print_node_set()

    if request.method == "POST":
        post = POST_parser(request)

        startNodeLatLng = node(post.lat1, post.lng1)
        destinationNodeLatLng = node(post.lat2, post.lng2)
        closestNodseToStart = closestNodeTo(startNodeLatLng,nodes)
        closestNodeToDestination = closestNodeTo(destinationNodeLatLng, nodes)
        
        shortestPath = dijkstra(adj_list, str(closestNodeToStart.id), str(closestNodeToDestination.id))


    
    context = {
        'GMAPS_API_KEY': '',
        'COORDS': node_set_values_json
    }
    
    return render(request, 'mapvis/mapapp.html', context)

