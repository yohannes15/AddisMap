from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest
from mapvis.store import Node, NodeSet
from mapvis.parser import get_default_parser, print_osm_data
from mapvis.extract import extract_osm_nodes, select_nodes_in_rectangle, extract_osm_edges
from mapvis.adjacency import adjacency_list
from mapvis.algorithms import dijkstra, closestNodeTo, shortestPathLatLng
from mapvis.parser_POST import POST_parser
from mapvis.forms import LatLongForm
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from collections import namedtuple
import os, json

# Create your views here.
def mapapp(request):
    #node_set = select_nodes_in_rectangle(nodes, 9.00602,9.01380,38.75469,38.76639 )
    #dijkstra(adj_list, '1732976686', '1732976651')
    #nodes_json = json.dumps([node.__dict__ for node in nodes_values], cls=DjangoJSONEncoder)
    #nodes_values = list(nodes.get_nodes().values())
    
    if request.method == 'GET':
        message = request.session.get('message')
        request.session['algorithms'] = None
        context = {
            'message':message,
            'GMAPS_API_KEY': 'AIzaSyAv0SjrNE-LMf6LncO5Lx40XP1VlGVCS6Q'
        }

    if request.method == 'POST':
    
        osmPath = "/Users/yohannes/Developer/mapApp/addismap/mapvis/gerjisecond.osm"
        nodes = extract_osm_nodes(osmPath)
        edges = extract_osm_edges(osmPath)
        adj_list = adjacency_list(nodes, edges)
        node = namedtuple('Node', ['lat', 'lng'])
#####
        post = POST_parser(request)
        startNodeLatLng = node(post.lat1, post.lng1)
        destinationNodeLatLng = node(post.lat2, post.lng2)
        closestNodeToStart = closestNodeTo(startNodeLatLng,nodes)
        closestNodeToDestination = closestNodeTo(destinationNodeLatLng, nodes)

        shortestPath = []
        searchAlgorithm = request.POST.get('search-algo')
        if searchAlgorithm == 'Dijkstra':
            shortestPath = dijkstra(adj_list, str(closestNodeToStart.id), str(closestNodeToDestination.id))

        if len(shortestPath)==0:
            request.session['message'] = "Sorry Couldn't Find Path. Please try different nodes"
            return redirect('/')
        else:
            request.session['message'] = None
            request.session['algorithm'] = searchAlgorithm
            
        shortestPathCoords = shortestPathLatLng(shortestPath, nodes)
        print(shortestPath)

        jsonShortestPathCoords = json.dumps(shortestPathCoords)
        print(jsonShortestPathCoords)

        request.session['shortestPathCoords'] = jsonShortestPathCoords
        return redirect('/showpath/')

    
    return render(request, 'mapvis/mapapp.html', context)


def showPath(request):
    shortestPathCoords = request.session.get('shortestPathCoords')
    algorithm = request.session.get('algorithm')
    context = {
        'GMAPS_API_KEY': 'AIzaSyAv0SjrNE-LMf6LncO5Lx40XP1VlGVCS6Q',
        'SHORTEST_PATH_COORDS': shortestPathCoords,
        'ALGORITHM': algorithm
    }
    return render(request, 'mapvis/show.html', context)
