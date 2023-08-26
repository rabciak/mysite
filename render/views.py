import json
from django.core.serializers import serialize
from django.views.generic import TemplateView
from render.models import NuclearReactor

class MarkersMapView(TemplateView):
    template_name = "render//index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        markers = NuclearReactor.objects.all()
        context["markers"] = json.loads(serialize("geojson", markers))
        return context