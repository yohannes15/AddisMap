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














