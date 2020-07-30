def get_float(request, id):
    value = request.POST.get(id)
    # Check that it's possible to convert input to float.
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def get_str(request, id):
    return request.POST.get(id)


class POST_parser:
    def __init__(self, request):
        # You can choose what variables you want to
        # get from POST and what to call them.
        self.lat1 = get_float(request, 'start-latitude')
        self.lng1 = get_float(request, 'start-longitude')
        self.lat2 = get_float(request, 'destination-latitude')
        self.lng2 = get_float(request, 'destination-longitude')