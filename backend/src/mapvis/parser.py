
"""
a class that can parse OpenStreetMap Node-data and OpenStreetMap Way-data.
There is a helper function for retrieving a default parser called get_default_parser(fname)
It provides a basic parser that can iterate over nodes and iterate over ways

If you want to tweak the behaviour of the default parser you can change the
tags that will be returned with the tuples DEFAULT_NODE/WAY_TAGS under the Module Config-section

The default parser will return edges with tags if they exist in "DEFAULT_WAY_TAGS".
You can tweak the behaviour of the default parser so that it will return all tags it encounters.
You do this by calling 'get_default_parser(fname, allow_all=True)'

The only dependency of the module is the xml.etree.ElementTree which 
is a part of the python library for both py2 and py3
"""

import xml.etree.ElementTree as ET
FILEEXT = ".osm"


##########################################
# Module config                          #
##########################################
DEFAULT_NODE_TAGS = ('id', 'lat', 'lon')
DEFAULT_WAY_TAGS = ('highway', 'name', 'oneway')


##########################################
# OSM Specific Keys                      #
##########################################
OSM_NODE = "node"
OSM_WAY = "way"
OSM_WAYNODE = "nd"
OSM_NODE_REFERENCE = "ref"
OSM_TAG = "tag"
OSM_WAY_ID = "id"
OSM_TAG_KEY = "k"
OSM_TAG_VALUE = "v"


##########################################
# Ouput keys for returned dictionary     #
##########################################
OUT_EDGE_ID = "id"
OUT_EDGES_KEY = "road"
OUT_TAGS_KEY = "tags"


##########################################
# Parser implementation                  #
##########################################

class OSMParser:
    """
    A Parser that parses OSM data and enables iterating over 
    Nodes and Ways as well as selecting which tags to show from the data.
    
    One of the focuses of the parser has been to create something simple
    that abstracts away as much object oriented features as possible from a normal user

    Essentially the parser will parse the XML file and convert each element present
    in the XML file into a python dictionary. (since this key-value stuff is basically what xml is)
    """


    def __init__(self, fname, all_way_tags):
        """ 
        Initialize. if all_way_tags is True then the parser will return ways
        with all tags, otherwise it will only choose specific tags
        """
        if not FILEEXT in fname:
            fname = fname + FILEEXT

        self.tree = ET.parse(fname) # ET, parse home
        self.node_tags = set()
        self.way_tags = set()
        self.allow_all = all_way_tags

        
    def add_node_tag(self, tag):
        """ Adds a tag to be searched for when looking at nodes """
        self.node_tags.add(tag)

 
    def add_way_tag(self, tag):
        """ Adds a tag to be searched for when looking at ways (edges) """
        self.way_tags.add(tag)


    def iter_nodes(self):
        """ 
        Iterator-object for all nodes in osm-tree.
        Returns a dictionary with the (manually) added tags
        """
        # Root of xml tree
        root = self.tree.getroot()
        for node in root.iter(OSM_NODE):

            # yield a dictionary with all tags that are added to self.node_tags
            yield { tag : node.attrib.get(tag, None) 
                    for tag in self.node_tags 
                    if tag in node.attrib }


    def iter_ways(self):
        """ 
        Iterator-object for all ways (edges) in osm-tree.
        Returns a dictionary with the ways
        """
        # Root of xml-tree
        root = self.tree.getroot()
        for way in root.iter(OSM_WAY):

            # Take out roads and tags
            road = tuple( node.attrib[OSM_NODE_REFERENCE] 
                          for node in way.iter(OSM_WAYNODE) )
            tags = { tag.attrib[OSM_TAG_KEY] : tag.attrib[OSM_TAG_VALUE] 
                     for tag in way.iter(OSM_TAG) 
                     if self.allow_all or tag.attrib[OSM_TAG_KEY] in self.way_tags}
            
            # Yield the edge id, the road and the tags
            yield {
                OUT_EDGE_ID : way.attrib[OSM_WAY_ID],
                OUT_EDGES_KEY : road,
                OUT_TAGS_KEY : tags,
            }
            

##########################################
# Example Usage and Default Getter       #
##########################################

def get_default_parser(fname, allow_all=False, verbose=True):
    """ 
    Returns a default parser 
    The config used can be tweaked inside the Module Config section

    allow_all sets if the parser should take all tags or if it should just
    take the tags specified, in this case all tags inside DEFAULT_WAY_TAGS
    """
    if verbose:
        print("Parsing OSM data from: {}".format(fname))

    parser = OSMParser(fname, allow_all)

    # Add default node and way tags
    for tag in DEFAULT_NODE_TAGS:
        parser.add_node_tag(tag)

    for tag in DEFAULT_WAY_TAGS:
        parser.add_way_tag(tag)
    
    return parser
        

def print_osm_data(fname):
    """
    Prints all the nodes and all the ways in the map
    Good example of how to use the code =D
    """
    # Create parser
    parser = get_default_parser(fname)
    
    # Print all nodes
    ##for node in parser.iter_nodes():
    ##    print (node)

    # Print all ways that are tagged with highway
    for way in parser.iter_ways():
        if 'highway' in way['tags']:
            print (way)
            

if __name__ == "__main__":
    fname = "uni_small.osm"
    print_osm_data(fname)
