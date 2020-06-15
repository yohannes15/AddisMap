from django import forms

class LatLongForm(forms.Form):
    start_latitude = forms.FloatField(label='Start Lat')
    start_longitude = forms.FloatField(label='Start Long')
    destination_latitude = forms.FloatField(label='Target Lat')
    destination_longitude = forms.FloatField(label='Target Long')

