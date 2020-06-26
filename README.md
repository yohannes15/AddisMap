# AddisMap Shortest Path Finding 

# Introduction

This project was inspired by my desire to learn different path finding algorithms. I was really interested and drawn by the enormous applications of path finding algorithms and the different varieties of these types of algorithms.

Pathfinding algorithms are usually an attempt to solve the shortest path problem in graph theory. They try to find the best path given a starting point and ending point based on some predefined criteria. In graph theory, the shortest path problem is the problem of finding a path between two vertices (or nodes) in a graph such that the sum of the weights of its constituent edges is minimized. In the case of unweighted graphs, this isn't really important.

I grew up in Addis Ababa, Ethiopia in the subcity Gerji. Growing up, I realized that people go around to places using landmarks such as historical buildings or statues... and nobody really uses nagivation or GPS on their map. This is in stark contrast to how people move around in New York City or any developed country. 

There are a variety of reasons for why this is. First, **Internet in Ethiopia** is very expensive and most people can't afford to use their data on navigation. Second, the general population ***don't really have advanced smart phones*** as compared to US or Western Countires. And finally, the navigation apps such as Google Maps don't really give the shortest path as they rely mostly on roads and there are a majority of roads in Ethiopia that aren't recongized as roads and there are alot of shortcuts people use that don't appear on Google Maps.

## AddisMap Application

This application allows you to set two markers on the google map API (Start, Destination). The Markers are defined by (S) for the start and a (FLAG) for the destination. The scope of the map area is in the sub city (GERJI) I grew up in. 

After choosing the markers, the latitude and longitude are stored and you are able to set the path finding algorithm (Breadth First Search, Depth First Search, Dijkstra, Greedy First Search, A-Star...) and it will use that algorithm for you to find the path.

![](images/frontpage.png)

**Example Path Finding Using Dijkstra's Algorithm**

![](images/path.png)

**If you scroll down, you can also see a visualizer of the algorithm! I feel that the visualizers are really important for understanding how these algorithms work. You can set mazes, block walls and understand how an algorithm finds the shortest path.**

![](images/visualizer.gif)

## HOW TO CLONE AND USE THIS PROJECT:

* Clone this project (https://github.com/yohannes15/AddisMap.git)
* Make sure to have Python Installed (Python3 preferably)
* Make sure to have Django Installed (Django 3.0.7 preferably)
* Make sure to have a Google API Key in order to work with Google Javascript Map API that is being used on this project. After getting the key, go to the mapvis/views.py file and change the GMAPS_KEY in the contexts of all the views which make use of the map.
* You basically have a working project now.

## THE DATA

The data for this map is extracted from OpenStreetMap. If you would like to work with a different part of the world/city/neighborhood, you need to extract it from OpenStreetMap and change the gerji.OSM file. If you are going to download a very metropoltian area such as New York or any other major city, just know that the most of the algorithms will take a much longer time. The Gerji.OSM file I have has over 100,000 nodes and it takes a couple seconds for the algorithm to run on the slower path finding algorithms. So just be mindful of that!

## FILES (Described)

* adjacency.py --> creates an adjacency list which represents the overall graph. It is a dictionary of dictionaries. 
**FORMAT** is like this: {nodeID: {neighborNode: distance(using harversine formula), anotherNeighborNode: distance, ...}, nodeID: {neighborNode: distance, ...}}


















