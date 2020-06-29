from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest
from mapvis.store import Node, NodeSet
from mapvis.parser import get_default_parser, print_osm_data
from mapvis.extract import extract_osm_nodes, extract_osm_edges
from mapvis.adjacency import adjacency_list
from mapvis.algorithms import closestNodeTo, shortestPathLatLng
from mapvis.dijkstra import dijkstra
from mapvis.bfs import breadth_first_search
from mapvis.greedysearch import greedy_search
from mapvis.astar import a_star_search
from mapvis.parser_POST import POST_parser
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from collections import namedtuple
import os, json

# Create your views here.
def mapapp(request):
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
        
        elif searchAlgorithm == 'A-Star':
            shortestPath = a_star_search(adj_list, closestNodeToStart, closestNodeToDestination, nodes)
        
        elif searchAlgorithm == 'Breadth-First Search (BFS)':
            shortestPath = breadth_first_search(adj_list, closestNodeToStart, closestNodeToDestination)

        elif searchAlgorithm == 'Greedy Best-First Search':
            shortestPath = greedy_search(adj_list, closestNodeToStart, closestNodeToDestination, nodes)

        if len(shortestPath)==0:
            request.session['message'] = "Sorry Couldn't Find Path. Please try different nodes. The Open Street Map data for Addis Ababa, Ethiopia (Gerji Specifically Here) isn't completely filled with all the nodes as accurately as other modern cities."
            return redirect('/')
        else:
            request.session['message'] = None
            request.session['algorithm'] = searchAlgorithm
        
        shortestPathCoords = shortestPathLatLng(shortestPath, nodes)
        #print(shortestPath)

        jsonShortestPathCoords = json.dumps(shortestPathCoords)
        #print(jsonShortestPathCoords)

        request.session['shortestPathCoords'] = jsonShortestPathCoords
        return redirect('/showpath/')

    
    return render(request, 'mapvis/mapapp.html', context)


def showPath(request):
    shortestPathCoords = request.session.get('shortestPathCoords')
    print(shortestPathCoords)
    algorithm = request.session.get('algorithm')
    context = {
        'GMAPS_API_KEY': 'AIzaSyAv0SjrNE-LMf6LncO5Lx40XP1VlGVCS6Q',
        'SHORTEST_PATH_COORDS': shortestPathCoords,
        'ALGORITHM': algorithm
    }
    return render(request, 'mapvis/show.html', context)
