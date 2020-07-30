from rest_framework.views import APIView
from rest_framework.response import Response

class MapView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "GMAPS_API_KEY": 'AIzaSyAv0SjrNE-LMf6LncO5Lx40XP1VlGVCS6Q'
        }
        return Response(data)