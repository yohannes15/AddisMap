from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder

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

from collections import namedtuple
import os, json
from django.http import JsonResponse

class MapView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "GMAPS_API_KEY": 'AIzaSyAv0SjrNE-LMf6LncO5Lx40XP1VlGVCS6Q'
        }
        return Response(data)
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        lat1, lng1 = request.data['startLatitude'], request.data['startLongitude']
        lat2, lng2 = request.data['targetLatitude'], request.data['targetLongitude']

        osmPath = "/Users/yohannes/Developer/mapApp/backend/src/mapvis/oak.osm"
        nodes = extract_osm_nodes(osmPath)
        edges = extract_osm_edges(osmPath)
        adj_list = adjacency_list(nodes, edges)
        node = namedtuple('Node', ['lat', 'lng'])
#####
        startNodeLatLng = node(float(lat1), float(lng1))
        destinationNodeLatLng = node(float(lat2), float(lng2))
        closestNodeToStart = closestNodeTo(startNodeLatLng,nodes)
        closestNodeToDestination = closestNodeTo(destinationNodeLatLng, nodes)


        shortestPath = []
        searchAlgorithm = request.data['algorithm']
        
        if searchAlgorithm == 'Dijkstra':
            shortestPath = dijkstra(adj_list, str(closestNodeToStart.id), str(closestNodeToDestination.id))
        
        elif searchAlgorithm == 'A-Star':
            shortestPath = a_star_search(adj_list, closestNodeToStart, closestNodeToDestination, nodes)
        
        elif searchAlgorithm == 'Breadth-First Search (BFS)':
            shortestPath = breadth_first_search(adj_list, closestNodeToStart, closestNodeToDestination)

        elif searchAlgorithm == 'Greedy Best-First Search':
            shortestPath = greedy_search(adj_list, closestNodeToStart, closestNodeToDestination, nodes)

        if len(shortestPath)==0:
            request.session['message'] = "Sorry Couldn't Find Path. Please try different nodes. The Open Street Map data for Addis Ababa, Ethiopia (Gerji) isn't completely filled with all the nodes as accurately as other modern cities."
            
        else:
            request.session['message'] = None
            request.session['algorithm'] = searchAlgorithm

        
        shortestPathCoords = shortestPathLatLng(shortestPath, nodes)
        #print(shortestPath)

        jsonShortestPathCoords = json.dumps(shortestPathCoords)
        print(shortestPathCoords)
        return Response({
            'COORDS': shortestPathCoords
        })
        
